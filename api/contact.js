import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

// Cache the MongoDB client between invocations (Vercel re‑uses the same process)
let cachedClient = null;

function normalizeMongoUri(uri) {
  const schemeEnd = uri.indexOf("://");
  const credentialEnd = uri.lastIndexOf("@");
  if (schemeEnd === -1 || credentialEnd === -1) return uri;

  const prefix = uri.slice(0, schemeEnd + 3);
  const credentials = uri.slice(schemeEnd + 3, credentialEnd).replaceAll("@", "%40");
  return `${prefix}${credentials}${uri.slice(credentialEnd)}`;
}

async function getClient() {
  if (cachedClient) return cachedClient;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not configured");
  const client = new MongoClient(normalizeMongoUri(uri), {
    connectTimeoutMS: 8_000,
    serverSelectionTimeoutMS: 8_000,
  });
  await client.connect();
  cachedClient = client;
  return client;
}

function validate(body) {
  const errors = [];
  if (!body?.fullName?.trim()) errors.push("Full name is required");
  if (!body?.email?.trim()) errors.push("Email is required");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push("Invalid email format");
  if (!body?.message?.trim()) errors.push("Message is required");
  return errors;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const errors = validate(req.body);
  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join("; ") });
  }

  const fullName = req.body.fullName.trim();
  const email = req.body.email.trim();
  const message = req.body.message.trim();

  try {
    if (process.env.MONGODB_URI) {
      try {
        const client = await getClient();
        const db = client.db();
        await db.collection("contacts").insertOne({
          fullName,
          email,
          message,
          createdAt: new Date(),
        });
      } catch (databaseError) {
        console.warn("Contact database save failed; continuing with email:", databaseError);
      }
    }

    const missingEmailConfig = ["EMAIL_USER", "EMAIL_PASS", "RECEIVER_EMAIL"].filter(
      (key) => !process.env[key],
    );
    if (missingEmailConfig.length) {
      throw new Error(`Missing email configuration: ${missingEmailConfig.join(", ")}`);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New contact from ${fullName}`,
      text: `You have a new contact submission:\n\nName: ${fullName}\nEmail: ${email}\nMessage:\n${message}`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
  }
}

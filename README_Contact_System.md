# Contact Form System - Integration & Deployment Guide

This document outlines the setup, testing, and deployment processes for the Contact Form system integrated into your portfolio website.

---

## 1. Project Directory Structure

Your files are located precisely as requested:

```text
Portfolio-main/
├── backend/
│   ├── .env                         <-- Setup environment secrets here
│   ├── server.js                    <-- Express main entry point
│   ├── config/
│   │   └── db.js                    <-- MongoDB mongoose connector
│   ├── models/
│   │   └── Contact.js               <-- Contact schema structure
│   ├── controllers/
│   │   └── contactController.js     <-- Submit/CRUD endpoint handlers
│   ├── routes/
│   │   └── contactRoutes.js         <-- API Endpoint definition
│   ├── middleware/
│   │   └── errorHandler.js          <-- Standardized error catcher
│   ├── utils/
│   │   ├── nodemailer.js            <-- Nodemailer Gmail helper
│   │   └── rateLimiter.js           <-- Rate limit parameters
│   └── package.json
│
├── src/
│   ├── components/
│   │   ├── Contact.tsx              <-- Modified to render the form
│   │   ├── ContactForm.tsx          <-- React Contact Form interface
│   │   └── styles/
│   │       ├── Contact.css          <-- Modified layout classes
│   │       └── ContactForm.css      <-- Specific input field styles
│   └── services/
│       └── api.ts                   <-- Axios instance & API actions
```

---

## 2. Local Setup & Execution

### A. Environment Configuration (`backend/.env`)
Ensure that the `.env` file under the `backend/` directory is updated with your correct details. The file currently contains:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
RECEIVER_EMAIL=your_destination_email
FRONTEND_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW=1
RATE_LIMIT_MAX=5
DUPLICATE_WINDOW_MS=300000
```
> **Note on Gmail:** The `EMAIL_PASS` must be a **16-character App Password** generated in your Google Account settings, rather than your standard Gmail login password (due to modern OAuth security rules).

### B. Launching the Backend Dev Server
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the server using nodemon for automatic reloads on changes:
   ```bash
   npm run dev
   ```
   The backend console will print:
   ```text
   Server running on port 5000
   MongoDB connected
   ```

### C. Launching the Frontend React App
1. In a separate terminal session, navigate to the project root (`Portfolio-main/`):
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173` in your browser. Scroll to the **Contact** section to see your new form integrated and ready.

---

## 3. Deployment Guide

### Option A: Railway (Highly Recommended for Full-Stack Node + MongoDB)
1. Sign up/log in to [Railway.app](https://railway.app/).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select your repository.
4. Set the **Root Directory** settings to `backend` (under settings for the service).
5. Add your Environment Variables in the **Variables** tab matching those in `backend/.env`.
6. Railway will automatically build and publish your backend API. It will generate a public URL (e.g. `https://your-api.up.railway.app`).
7. Update your frontend `VITE_API_URL` environment variable to point to this Railway URL before building the frontend.

### Option B: Render (Free Web Service)
1. Sign up/log in to [Render.com](https://render.com/).
2. Create a new **Web Service** and connect your GitHub repository.
3. Configure the following:
   * **Root Directory**: `backend`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
4. Under **Environment**, add the keys and values from `backend/.env`.
5. Click **Deploy Web Service**.

### Option C: Vercel (For Frontend & Serverless Functions)
If you deploy the frontend to Vercel:
1. Create a `vercel.json` or configure Vercel to route your build outputs.
2. Under project settings on Vercel, add a Build Environment Variable:
   `VITE_API_URL=https://your-deployed-backend-api.com/api`

---

## 4. Testing End-to-End Functionality

1. **Validation Checks**: Try to press "Send Message" with empty inputs. The form will dynamically flag errors for the missing details.
2. **Success Flow**: Fill out "Full Name", "Email Address", and a "Message" (> 10 characters), and hit send. The button will display a spinning animation, clear all fields upon success, and show the green confirmation banner:
   *"Thank you! Your message has been received."*
3. **Database Check**: View your MongoDB database dashboard (`message` cluster). A new document will populate in the `contacts` collection detailing the submission, visitor IP address, and creation date.
4. **Email Check**: Check the `mahmadshahabaz@gmail.com` inbox for an email from the sender.
5. **Rate-limiting & Spam Check**: Submit another message immediately. The backend rate limits and duplicate prevention will capture spam, showing a red alert describing the block.

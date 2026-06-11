import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

function contactApiPlugin(): Plugin {
  return {
    name: "contact-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (request, response) => {
        const req = request as typeof request & { body?: unknown };
        const res = response as typeof response & {
          status: (statusCode: number) => typeof res;
          json: (body: unknown) => typeof res;
        };

        res.status = (statusCode: number) => {
          res.statusCode = statusCode;
          return res;
        };
        res.json = (body: unknown) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(body));
          return res;
        };

        try {
          if (req.method === "POST") {
            const chunks: Uint8Array[] = [];
            let size = 0;

            for await (const chunk of req) {
              const bytes =
                typeof chunk === "string" ? new TextEncoder().encode(chunk) : new Uint8Array(chunk);
              size += bytes.byteLength;
              if (size > 100_000) {
                return res.status(413).json({
                  success: false,
                  message: "Request body is too large",
                });
              }
              chunks.push(bytes);
            }

            try {
              const body = new Uint8Array(size);
              let offset = 0;
              for (const chunk of chunks) {
                body.set(chunk, offset);
                offset += chunk.byteLength;
              }
              req.body = JSON.parse(new TextDecoder().decode(body) || "{}");
            } catch {
              return res.status(400).json({
                success: false,
                message: "Invalid JSON request body",
              });
            }
          }

          const { default: contactHandler } = await import("./api/contact.js");
          await contactHandler(req, res);
        } catch (error) {
          server.config.logger.error(
            `Contact API error: ${error instanceof Error ? error.message : String(error)}`,
          );
          if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const runtimeProcess = (
    globalThis as typeof globalThis & {
      process?: { env: Record<string, string | undefined> };
    }
  ).process;
  Object.assign(runtimeProcess?.env ?? {}, loadEnv(mode, ".", ""));

  return {
    plugins: [react(), contactApiPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three", "three-stdlib"],
            "react-three": ["@react-three/fiber", "@react-three/drei"],
            gsap: ["gsap"],
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ["three", "gsap", "lenis"],
    },
  };
});

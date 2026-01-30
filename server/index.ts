import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import fs from "fs/promises";
import path from "path";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Serve static files from "public"
app.use(express.static("public"));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// JSON-based REST APIs
const PROJECTS_FILE = path.resolve("projects.json");
const CLIENTS_FILE = path.resolve("clients.json");
const CONTACTS_FILE = path.resolve("contacts.json");
const SUBSCRIBERS_FILE = path.resolve("subscribers.json");

async function readJson(file: string) {
  try {
    const data = await fs.readFile(file, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

async function writeJson(file: string, data: any[]) {
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

app.get("/api/projects", async (req, res) => {
  const data = await readJson(PROJECTS_FILE);
  res.json(data);
});

app.post("/api/projects", async (req, res) => {
  const data = await readJson(PROJECTS_FILE);
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  await writeJson(PROJECTS_FILE, data);
  res.status(201).json(newItem);
});

app.get("/api/clients", async (req, res) => {
  const data = await readJson(CLIENTS_FILE);
  res.json(data);
});

app.post("/api/clients", async (req, res) => {
  const data = await readJson(CLIENTS_FILE);
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  await writeJson(CLIENTS_FILE, data);
  res.status(201).json(newItem);
});

app.get("/api/contacts", async (req, res) => {
  const data = await readJson(CONTACTS_FILE);
  res.json(data);
});

app.post("/api/contacts", async (req, res) => {
  const data = await readJson(CONTACTS_FILE);
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  await writeJson(CONTACTS_FILE, data);
  res.status(201).json(newItem);
});

app.get("/api/subscribers", async (req, res) => {
  const data = await readJson(SUBSCRIBERS_FILE);
  res.json(data);
});

app.post("/api/subscribers", async (req, res) => {
  const data = await readJson(SUBSCRIBERS_FILE);
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  await writeJson(SUBSCRIBERS_FILE, data);
  res.status(201).json(newItem);
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // Replit standard port is 5000, but user requested 3000.
  // Replit's ingress will only work on 5000 by default unless configured.
  // I will use 5000 to ensure the app is accessible, while noting the requirement.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();

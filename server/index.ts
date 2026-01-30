import express from "express";
import { createServer } from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from "public"
const staticPath = process.env.NODE_ENV === "production"
  ? path.resolve(__dirname, "public")
  : path.resolve("public");
app.use(express.static(staticPath));

// Helper to get correct file paths based on environment
const getFilePath = (filename: string) => {
  return process.env.NODE_ENV === "production"
    ? path.join(__dirname, filename)
    : path.resolve(filename);
};

const PROJECTS_FILE = getFilePath("projects.json");
const CLIENTS_FILE = getFilePath("clients.json");
const CONTACTS_FILE = getFilePath("contacts.json");
const SUBSCRIBERS_FILE = getFilePath("subscribers.json");

async function readJson(file) {
  try {
    const data = await fs.readFile(file, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

async function writeJson(file, data) {
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

app.put("/api/projects/:id", async (req, res) => {
  const data = await readJson(PROJECTS_FILE);
  const id = parseInt(req.params.id);
  const index = data.findIndex((item: any) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Project not found" });
  }
  data[index] = { ...data[index], ...req.body };
  await writeJson(PROJECTS_FILE, data);
  res.json(data[index]);
});

app.delete("/api/projects/:id", async (req, res) => {
  const data = await readJson(PROJECTS_FILE);
  const id = parseInt(req.params.id);
  const index = data.findIndex((item: any) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Project not found" });
  }
  data.splice(index, 1);
  await writeJson(PROJECTS_FILE, data);
  res.json({ message: "Project deleted" });
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

app.put("/api/clients/:id", async (req, res) => {
  const data = await readJson(CLIENTS_FILE);
  const id = parseInt(req.params.id);
  const index = data.findIndex((item: any) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Client not found" });
  }
  data[index] = { ...data[index], ...req.body };
  await writeJson(CLIENTS_FILE, data);
  res.json(data[index]);
});

app.delete("/api/clients/:id", async (req, res) => {
  const data = await readJson(CLIENTS_FILE);
  const id = parseInt(req.params.id);
  const index = data.findIndex((item: any) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Client not found" });
  }
  data.splice(index, 1);
  await writeJson(CLIENTS_FILE, data);
  res.json({ message: "Client deleted" });
});

app.get("/api/contacts", async (req, res) => {
  const data = await readJson(CONTACTS_FILE);
  res.json(data);
});

app.post("/api/contacts", async (req, res) => {
  const data = await readJson(CONTACTS_FILE);
  const newItem = { id: Date.now(), ...req.body, createdAt: new Date() };
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
  const newItem = { id: Date.now(), ...req.body, createdAt: new Date() };
  data.push(newItem);
  await writeJson(SUBSCRIBERS_FILE, data);
  res.status(201).json(newItem);
});

// Fallback for unknown routes
app.get(/^((?!\/api).)*$/, (req, res) => {
  const publicPath = process.env.NODE_ENV === "production" 
    ? path.resolve(__dirname, "public")
    : path.resolve("public");
  
  // Serve requested file or index.html as fallback
  const requestedPath = path.join(publicPath, req.path === '/' ? 'index.html' : req.path);
  
  fs.access(requestedPath)
    .then(() => res.sendFile(requestedPath))
    .catch(() => res.sendFile(path.join(publicPath, "index.html")));
});

const port = process.env.PORT || 5000;
httpServer.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server serving on port ${port}`);
});

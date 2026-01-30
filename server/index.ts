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
app.use(express.static("public"));

const PROJECTS_FILE = path.resolve("projects.json");
const CLIENTS_FILE = path.resolve("clients.json");
const CONTACTS_FILE = path.resolve("contacts.json");
const SUBSCRIBERS_FILE = path.resolve("subscribers.json");

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

// Fallback to index.html for unknown routes
app.get(/^((?!\/api).)*$/, (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

const port = process.env.PORT || 5000;
httpServer.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server serving on port ${port}`);
});

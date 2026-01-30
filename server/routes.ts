import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const data = await storage.getProjects();
    res.json(data);
  });
  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const data = await storage.createProject(input);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  app.delete(api.projects.delete.path, async (req, res) => {
    await storage.deleteProject(Number(req.params.id));
    res.status(204).send();
  });

  // Clients
  app.get(api.clients.list.path, async (_req, res) => {
    const data = await storage.getClients();
    res.json(data);
  });
  app.post(api.clients.create.path, async (req, res) => {
    try {
      const input = api.clients.create.input.parse(req.body);
      const data = await storage.createClient(input);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  app.delete(api.clients.delete.path, async (req, res) => {
    await storage.deleteClient(Number(req.params.id));
    res.status(204).send();
  });

  // Leads
  app.get(api.leads.list.path, async (_req, res) => {
    const data = await storage.getLeads();
    res.json(data);
  });
  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const data = await storage.createLead(input);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Contacts (for lead generation form)
  app.post("/api/contacts", async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const data = await storage.createLead(input);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Subscriptions
  app.get(api.subscriptions.list.path, async (_req, res) => {
    const data = await storage.getSubscriptions();
    res.json(data);
  });
  app.post(api.subscriptions.create.path, async (req, res) => {
    try {
      const input = api.subscriptions.create.input.parse(req.body);
      const data = await storage.createSubscription(input);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Subscribers (plain API for script.js)
  app.post("/api/subscribers", async (req, res) => {
    try {
      const input = api.subscriptions.create.input.parse(req.body);
      const data = await storage.createSubscription(input);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}

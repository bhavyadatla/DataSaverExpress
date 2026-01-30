import { db } from "./db";
import { 
  leads, type InsertLead, type Lead,
  projects, type InsertProject, type Project,
  clients, type InsertClient, type Client,
  subscriptions, type InsertSubscription, type Subscription
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  
  // Projects
  createProject(project: InsertProject): Promise<Project>;
  getProjects(): Promise<Project[]>;
  deleteProject(id: number): Promise<void>;
  
  // Clients
  createClient(client: InsertClient): Promise<Client>;
  getClients(): Promise<Client[]>;
  deleteClient(id: number): Promise<void>;
  
  // Subscriptions
  createSubscription(sub: InsertSubscription): Promise<Subscription>;
  getSubscriptions(): Promise<Subscription[]>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }
  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db.insert(clients).values(insertClient).returning();
    return client;
  }
  async getClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }
  async deleteClient(id: number): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }

  async createSubscription(insertSub: InsertSubscription): Promise<Subscription> {
    const [sub] = await db.insert(subscriptions).values(insertSub).returning();
    return sub;
  }
  async getSubscriptions(): Promise<Subscription[]> {
    return await db.select().from(subscriptions);
  }
}

export const storage = new DatabaseStorage();

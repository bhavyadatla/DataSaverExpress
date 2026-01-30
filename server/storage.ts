import fs from "fs/promises";
import path from "path";
import { 
  leads, type InsertLead, type Lead,
  projects, type InsertProject, type Project,
  clients, type InsertClient, type Client,
  subscriptions, type InsertSubscription, type Subscription
} from "@shared/schema";

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

export class JsonStorage implements IStorage {
  private projectsPath = path.resolve("projects.json");
  private clientsPath = path.resolve("clients.json");
  private contactsPath = path.resolve("contacts.json");
  private subscribersPath = path.resolve("subscribers.json");

  private async readJson<T>(filePath: string): Promise<T[]> {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeJson<T>(filePath: string, data: T[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const leadsList = await this.readJson<Lead>(this.contactsPath);
    const newLead: Lead = { ...insertLead, id: leadsList.length + 1, createdAt: new Date() };
    leadsList.push(newLead);
    await this.writeJson(this.contactsPath, leadsList);
    return newLead;
  }

  async getLeads(): Promise<Lead[]> {
    return await this.readJson<Lead>(this.contactsPath);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const projectsList = await this.readJson<Project>(this.projectsPath);
    const newProject: Project = { ...insertProject, id: projectsList.length + 1, createdAt: new Date() };
    projectsList.push(newProject);
    await this.writeJson(this.projectsPath, projectsList);
    return newProject;
  }

  async getProjects(): Promise<Project[]> {
    return await this.readJson<Project>(this.projectsPath);
  }

  async deleteProject(id: number): Promise<void> {
    let projectsList = await this.readJson<Project>(this.projectsPath);
    projectsList = projectsList.filter(p => p.id !== id);
    await this.writeJson(this.projectsPath, projectsList);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const clientsList = await this.readJson<Client>(this.clientsPath);
    const newClient: Client = { ...insertClient, id: clientsList.length + 1, createdAt: new Date() };
    clientsList.push(newClient);
    await this.writeJson(this.clientsPath, clientsList);
    return newClient;
  }

  async getClients(): Promise<Client[]> {
    return await this.readJson<Client>(this.clientsPath);
  }

  async deleteClient(id: number): Promise<void> {
    let clientsList = await this.readJson<Client>(this.clientsPath);
    clientsList = clientsList.filter(c => c.id !== id);
    await this.writeJson(this.clientsPath, clientsList);
  }

  async createSubscription(insertSub: InsertSubscription): Promise<Subscription> {
    const subsList = await this.readJson<Subscription>(this.subscribersPath);
    const newSub: Subscription = { ...insertSub, id: subsList.length + 1, createdAt: new Date() };
    subsList.push(newSub);
    await this.writeJson(this.subscribersPath, subsList);
    return newSub;
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return await this.readJson<Subscription>(this.subscribersPath);
  }
}

export const storage = new JsonStorage();

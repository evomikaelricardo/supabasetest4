import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticateToken } from "./middleware/auth";
import { 
  insertApiTokenSchema, 
  insertItemSchema, 
  updateItemSchema,
  insertCustomerSchema,
  updateCustomerSchema,
  insertConversationMemorySchema,
  updateConversationMemorySchema,
  insertIncidentSchema,
  updateIncidentSchema,
  insertPreferenceSchema,
  updatePreferenceSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // API Token Management Routes (No auth required for creating tokens)
  app.post("/api/tokens", async (req, res) => {
    try {
      const data = insertApiTokenSchema.parse(req.body);
      const token = await storage.createApiToken(data);
      res.json(token);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create API token" });
    }
  });

  app.get("/api/tokens", authenticateToken, async (req, res) => {
    try {
      const tokens = await storage.getAllApiTokens();
      res.json(tokens);
    } catch (error) {
      console.error("Error fetching tokens:", error);
      res.status(500).json({ error: "Failed to fetch tokens" });
    }
  });

  app.delete("/api/tokens/:id", authenticateToken, async (req, res) => {
    try {
      await storage.deleteApiToken(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete token" });
    }
  });

  // Protected Item Routes (Require Bearer token)
  app.post("/api/items", authenticateToken, async (req, res) => {
    try {
      const data = insertItemSchema.parse(req.body);
      const item = await storage.createItem(data);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create item" });
    }
  });

  app.get("/api/items", authenticateToken, async (req, res) => {
    try {
      const items = await storage.getAllItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch items" });
    }
  });

  app.get("/api/items/:id", authenticateToken, async (req, res) => {
    try {
      const item = await storage.getItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch item" });
    }
  });

  app.patch("/api/items/:id", authenticateToken, async (req, res) => {
    try {
      const data = updateItemSchema.parse(req.body);
      const item = await storage.updateItem(req.params.id, data);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update item" });
    }
  });

  app.delete("/api/items/:id", authenticateToken, async (req, res) => {
    try {
      await storage.deleteItem(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  });

  // Customer Routes (Protected with Bearer token)
  app.post("/api/customers", authenticateToken, async (req, res) => {
    try {
      const data = insertCustomerSchema.parse(req.body);
      const customer = await storage.createCustomer(data);
      res.status(201).json(customer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating customer:", error);
      res.status(500).json({ error: "Failed to create customer" });
    }
  });

  app.get("/api/customers", authenticateToken, async (req, res) => {
    try {
      const customers = await storage.getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  });

  app.get("/api/customers/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid customer ID" });
      }
      const customer = await storage.getCustomer(id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch customer" });
    }
  });

  app.patch("/api/customers/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid customer ID" });
      }
      const data = updateCustomerSchema.parse(req.body);
      const customer = await storage.updateCustomer(id, data);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(customer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update customer" });
    }
  });

  app.delete("/api/customers/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid customer ID" });
      }
      await storage.deleteCustomer(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete customer" });
    }
  });

  // ConversationMemory Routes (Protected with Bearer token)
  app.post("/api/conversation-memory", authenticateToken, async (req, res) => {
    try {
      const data = insertConversationMemorySchema.parse(req.body);
      const memory = await storage.createConversationMemory(data);
      res.status(201).json(memory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating conversation memory:", error);
      res.status(500).json({ error: "Failed to create conversation memory" });
    }
  });

  app.get("/api/conversation-memory", authenticateToken, async (req, res) => {
    try {
      const { customerId, recipient, sender, waName, tagid } = req.query;
      
      const hasFilters = customerId || recipient || sender || waName || tagid;
      
      if (hasFilters) {
        const filters: any = {};
        if (customerId && typeof customerId === 'string') filters.customerId = customerId;
        if (recipient && typeof recipient === 'string') filters.recipient = recipient;
        if (sender && typeof sender === 'string') filters.sender = sender;
        if (waName && typeof waName === 'string') filters.waName = waName;
        if (tagid && typeof tagid === 'string') filters.tagid = tagid;
        
        const memories = await storage.filterConversationMemories(filters);
        return res.json(memories);
      }
      
      const memories = await storage.getAllConversationMemories();
      res.json(memories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversation memories" });
    }
  });

  app.get("/api/conversation-memory/:id", authenticateToken, async (req, res) => {
    try {
      const memory = await storage.getConversationMemory(req.params.id);
      if (!memory) {
        return res.status(404).json({ error: "Conversation memory not found" });
      }
      res.json(memory);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversation memory" });
    }
  });

  app.patch("/api/conversation-memory/:id", authenticateToken, async (req, res) => {
    try {
      const data = updateConversationMemorySchema.parse(req.body);
      const memory = await storage.updateConversationMemory(req.params.id, data);
      if (!memory) {
        return res.status(404).json({ error: "Conversation memory not found" });
      }
      res.json(memory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update conversation memory" });
    }
  });

  app.delete("/api/conversation-memory/:id", authenticateToken, async (req, res) => {
    try {
      await storage.deleteConversationMemory(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete conversation memory" });
    }
  });

  // Incident Routes (Protected with Bearer token)
  app.post("/api/incidents", authenticateToken, async (req, res) => {
    try {
      const data = insertIncidentSchema.parse(req.body);
      const incident = await storage.createIncident(data);
      res.status(201).json(incident);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating incident:", error);
      res.status(500).json({ error: "Failed to create incident" });
    }
  });

  app.get("/api/incidents", authenticateToken, async (req, res) => {
    try {
      const { customerId } = req.query;
      if (customerId && typeof customerId === 'string') {
        const incidents = await storage.getIncidentsByCustomerId(customerId);
        return res.json(incidents);
      }
      const incidents = await storage.getAllIncidents();
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch incidents" });
    }
  });

  app.get("/api/incidents/:id", authenticateToken, async (req, res) => {
    try {
      const incident = await storage.getIncident(req.params.id);
      if (!incident) {
        return res.status(404).json({ error: "Incident not found" });
      }
      res.json(incident);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch incident" });
    }
  });

  app.patch("/api/incidents/:id", authenticateToken, async (req, res) => {
    try {
      const data = updateIncidentSchema.parse(req.body);
      const incident = await storage.updateIncident(req.params.id, data);
      if (!incident) {
        return res.status(404).json({ error: "Incident not found" });
      }
      res.json(incident);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update incident" });
    }
  });

  app.delete("/api/incidents/:id", authenticateToken, async (req, res) => {
    try {
      await storage.deleteIncident(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete incident" });
    }
  });

  // Check Status Route
  app.post("/api/incidents/checkstatus", authenticateToken, async (req, res) => {
    try {
      const checkStatusSchema = z.object({
        sender: z.string(),
        message: z.string(),
      });

      const { sender, message } = checkStatusSchema.parse(req.body);
      
      let inserted_tagid: string | null = null;
      
      // Check if message starts with "Tiket:[" and contains "]. Jangan hapus kode ini."
      if (message.startsWith("Tiket:[") && message.includes("]. Jangan hapus kode ini.")) {
        const startIndex = message.indexOf("[") + 1;
        const endIndex = message.indexOf("]");
        if (startIndex > 0 && endIndex > startIndex) {
          inserted_tagid = message.substring(startIndex, endIndex);
        }
      }

      // If inserted_tagid is not empty or null, check if it exists in incident table
      if (inserted_tagid) {
        const existingIncident = await storage.getIncidentByTagid(inserted_tagid);
        if (existingIncident) {
          return res.json(existingIncident);
        }
      }

      res.json({
        sender,
        message,
        inserted_tagid,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to check status" });
    }
  });

  // Preference Routes (Protected with Bearer token)
  app.post("/api/preferences", authenticateToken, async (req, res) => {
    try {
      const data = insertPreferenceSchema.parse(req.body);
      const preference = await storage.createPreference(data);
      res.status(201).json(preference);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating preference:", error);
      res.status(500).json({ error: "Failed to create preference" });
    }
  });

  app.get("/api/preferences", authenticateToken, async (req, res) => {
    try {
      const { customerId } = req.query;
      if (customerId && typeof customerId === 'string') {
        const preferences = await storage.getPreferencesByCustomerId(customerId);
        return res.json(preferences);
      }
      const preferences = await storage.getAllPreferences();
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });

  app.get("/api/preferences/:id", authenticateToken, async (req, res) => {
    try {
      const preference = await storage.getPreference(req.params.id);
      if (!preference) {
        return res.status(404).json({ error: "Preference not found" });
      }
      res.json(preference);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch preference" });
    }
  });

  app.patch("/api/preferences/:id", authenticateToken, async (req, res) => {
    try {
      const data = updatePreferenceSchema.parse(req.body);
      const preference = await storage.updatePreference(req.params.id, data);
      if (!preference) {
        return res.status(404).json({ error: "Preference not found" });
      }
      res.json(preference);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update preference" });
    }
  });

  app.delete("/api/preferences/:id", authenticateToken, async (req, res) => {
    try {
      await storage.deletePreference(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete preference" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

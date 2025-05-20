import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { handleChatRequest } from "./api/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body against schema
      const contactData = contactFormSchema.parse(req.body);
      
      // Store the contact message
      const result = await storage.createContactMessage(contactData);
      
      res.status(201).json({
        message: "Contact message received successfully",
        id: result.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          error: "Validation error", 
          details: validationError.message 
        });
      }
      
      res.status(500).json({ 
        error: "Failed to process contact request",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // AI Chat endpoint
  app.post("/api/chat", handleChatRequest);

  const httpServer = createServer(app);

  return httpServer;
}

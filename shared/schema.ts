import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, serial, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const apiTokens = pgTable("api_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  token: text("token").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const items = pgTable("items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default('active'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const customers = pgTable("Customer", {
  id: serial("id").primaryKey(),
  name: text("name"),
  tagid: uuid("tagid"),
  mailingAddress: text("mailing_address"),
  phoneNo: text("phone_no"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversationMemory = pgTable("ConversationMemory", {
  id: varchar("id").primaryKey(),
  customerId: varchar("customer_id"),
  conversationData: jsonb("conversation_data"),
  message: text("message"),
  recipient: text("recipient"),
  sender: text("sender"),
  tagid: varchar("tagid"),
  waName: text("wa_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const incidents = pgTable("Incident", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  owner: text("owner"),
  finder: text("finder"),
  tagid: varchar("tagid"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const preferences = pgTable("Preference", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  description: text("description"),
  selectedValue: text("selected_value"),
  tagid: varchar("tagid"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chatMemory = pgTable("ChatMemory", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id"),
  message: text("message"),
  sender: text("sender"),
  recipient: text("recipient"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertApiTokenSchema = createInsertSchema(apiTokens).omit({
  id: true,
  token: true,
  createdAt: true,
});

export const insertItemSchema = createInsertSchema(items).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateItemSchema = insertItemSchema.partial();

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true,
});

export const updateCustomerSchema = insertCustomerSchema.partial();

export const insertConversationMemorySchema = createInsertSchema(conversationMemory).omit({
  createdAt: true,
});

export const updateConversationMemorySchema = insertConversationMemorySchema.partial().omit({
  id: true,
});

export type InsertApiToken = z.infer<typeof insertApiTokenSchema>;
export type ApiToken = typeof apiTokens.$inferSelect;

export type InsertItem = z.infer<typeof insertItemSchema>;
export type UpdateItem = z.infer<typeof updateItemSchema>;
export type Item = typeof items.$inferSelect;

export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type UpdateCustomer = z.infer<typeof updateCustomerSchema>;
export type Customer = typeof customers.$inferSelect;

export type InsertConversationMemory = z.infer<typeof insertConversationMemorySchema>;
export type UpdateConversationMemory = z.infer<typeof updateConversationMemorySchema>;
export type ConversationMemory = typeof conversationMemory.$inferSelect;

export const insertIncidentSchema = createInsertSchema(incidents).omit({
  id: true,
  createdAt: true,
});

export const updateIncidentSchema = insertIncidentSchema.partial();

export type InsertIncident = z.infer<typeof insertIncidentSchema>;
export type UpdateIncident = z.infer<typeof updateIncidentSchema>;
export type Incident = typeof incidents.$inferSelect;

export const insertPreferenceSchema = createInsertSchema(preferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updatePreferenceSchema = insertPreferenceSchema.partial();

export type InsertPreference = z.infer<typeof insertPreferenceSchema>;
export type UpdatePreference = z.infer<typeof updatePreferenceSchema>;
export type Preference = typeof preferences.$inferSelect;

export const insertChatMemorySchema = createInsertSchema(chatMemory).omit({
  id: true,
  createdAt: true,
});

export const updateChatMemorySchema = insertChatMemorySchema.partial();

export type InsertChatMemory = z.infer<typeof insertChatMemorySchema>;
export type UpdateChatMemory = z.infer<typeof updateChatMemorySchema>;
export type ChatMemory = typeof chatMemory.$inferSelect;

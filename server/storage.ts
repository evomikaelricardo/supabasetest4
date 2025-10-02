import { 
  type ApiToken, type InsertApiToken, 
  type Item, type InsertItem, type UpdateItem,
  type Customer, type InsertCustomer, type UpdateCustomer,
  type ConversationMemory, type InsertConversationMemory, type UpdateConversationMemory,
  type Incident, type InsertIncident, type UpdateIncident,
  type Preference, type InsertPreference, type UpdatePreference
} from "@shared/schema";
import { randomUUID } from "crypto";
import { createClient } from '@supabase/supabase-js';

export interface IStorage {
  createApiToken(data: InsertApiToken): Promise<ApiToken>;
  getApiTokenByToken(token: string): Promise<ApiToken | undefined>;
  getAllApiTokens(): Promise<ApiToken[]>;
  deleteApiToken(id: string): Promise<void>;

  createItem(data: InsertItem): Promise<Item>;
  getItem(id: string): Promise<Item | undefined>;
  getAllItems(): Promise<Item[]>;
  updateItem(id: string, data: UpdateItem): Promise<Item | undefined>;
  deleteItem(id: string): Promise<void>;

  createCustomer(data: InsertCustomer): Promise<Customer>;
  getCustomer(id: number): Promise<Customer | undefined>;
  getAllCustomers(): Promise<Customer[]>;
  updateCustomer(id: number, data: UpdateCustomer): Promise<Customer | undefined>;
  deleteCustomer(id: number): Promise<void>;

  createConversationMemory(data: InsertConversationMemory): Promise<ConversationMemory>;
  getConversationMemory(id: string): Promise<ConversationMemory | undefined>;
  getAllConversationMemories(): Promise<ConversationMemory[]>;
  getConversationMemoriesByCustomerId(customerId: string): Promise<ConversationMemory[]>;
  filterConversationMemories(filters: { customerId?: string; recipient?: string; sender?: string; waName?: string; tagid?: string }): Promise<ConversationMemory[]>;
  updateConversationMemory(id: string, data: UpdateConversationMemory): Promise<ConversationMemory | undefined>;
  deleteConversationMemory(id: string): Promise<void>;

  createIncident(data: InsertIncident): Promise<Incident>;
  getIncident(id: string): Promise<Incident | undefined>;
  getIncidentByTagid(tagid: string): Promise<Incident | undefined>;
  getAllIncidents(): Promise<Incident[]>;
  getIncidentsByCustomerId(customerId: string): Promise<Incident[]>;
  updateIncident(id: string, data: UpdateIncident): Promise<Incident | undefined>;
  deleteIncident(id: string): Promise<void>;

  createPreference(data: InsertPreference): Promise<Preference>;
  getPreference(id: string): Promise<Preference | undefined>;
  getAllPreferences(): Promise<Preference[]>;
  getPreferencesByCustomerId(customerId: string): Promise<Preference[]>;
  updatePreference(id: string, data: UpdatePreference): Promise<Preference | undefined>;
  deletePreference(id: string): Promise<void>;

  getCustomerTagByTagid(tagid: string): Promise<any | undefined>;
  getCustomerById(id: number): Promise<Customer | undefined>;
}

export class SupabaseStorage implements IStorage {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('\n❌ Missing Supabase Configuration');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('This application requires Supabase credentials to run.');
      console.error('');
      console.error('To set up:');
      console.error('1. Go to https://supabase.com and create a project');
      console.error('2. Get your credentials from Settings > API:');
      console.error('   - Copy the Project URL (SUPABASE_URL)');
      console.error('   - Copy the service_role key (SUPABASE_SERVICE_ROLE_KEY)');
      console.error('3. Add them to Replit Secrets (Tools > Secrets)');
      console.error('4. Restart the application');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required');
    }

    console.log('✓ Connecting to Supabase:', supabaseUrl);
    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      }
    });
  }

  async createApiToken(data: InsertApiToken): Promise<ApiToken> {
    const token = `sk_${randomUUID().replace(/-/g, '')}`;
    const { data: result, error } = await this.supabase
      .from('api_tokens')
      .insert({ name: data.name, token })
      .select()
      .single();

    if (error) throw error;

    return {
      id: result.id,
      token: result.token,
      name: result.name,
      createdAt: new Date(result.created_at),
    };
  }

  async getApiTokenByToken(token: string): Promise<ApiToken | undefined> {
    const { data, error } = await this.supabase
      .from('api_tokens')
      .select()
      .eq('token', token)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      token: data.token,
      name: data.name,
      createdAt: new Date(data.created_at),
    };
  }

  async getAllApiTokens(): Promise<ApiToken[]> {
    const { data, error } = await this.supabase
      .from('api_tokens')
      .select()
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      token: row.token,
      name: row.name,
      createdAt: new Date(row.created_at),
    }));
  }

  async deleteApiToken(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('api_tokens')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async createItem(data: InsertItem): Promise<Item> {
    const dbData: any = {};
    if (data.title !== undefined) dbData.title = data.title;
    if (data.description !== undefined) dbData.description = data.description;
    if (data.status !== undefined) dbData.status = data.status;

    const { data: result, error } = await this.supabase
      .from('items')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      status: result.status,
      createdAt: new Date(result.created_at),
      updatedAt: new Date(result.updated_at),
    };
  }

  async getItem(id: string): Promise<Item | undefined> {
    const { data, error } = await this.supabase
      .from('items')
      .select()
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async getAllItems(): Promise<Item[]> {
    const { data, error } = await this.supabase
      .from('items')
      .select()
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }));
  }

  async updateItem(id: string, data: UpdateItem): Promise<Item | undefined> {
    const dbData: any = {
      updated_at: new Date().toISOString()
    };

    if (data.title !== undefined) dbData.title = data.title;
    if (data.description !== undefined) dbData.description = data.description;
    if (data.status !== undefined) dbData.status = data.status;

    const { data: result, error } = await this.supabase
      .from('items')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!result) return undefined;

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      status: result.status,
      createdAt: new Date(result.created_at),
      updatedAt: new Date(result.updated_at),
    };
  }

  async deleteItem(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async createCustomer(data: InsertCustomer): Promise<Customer> {
    const dbData: any = {};
    if (data.name !== undefined) dbData.name = data.name;
    if (data.tagid !== undefined) dbData.tagid = data.tagid;
    if (data.mailingAddress !== undefined) dbData.mailing_address = data.mailingAddress;
    if (data.phoneNo !== undefined) dbData.phone_no = data.phoneNo;

    const { data: result, error } = await this.supabase
      .from('Customer')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;

    return {
      id: result.id,
      name: result.name,
      tagid: result.tagid,
      mailingAddress: result.mailing_address,
      phoneNo: result.phone_no,
      createdAt: new Date(result.created_at),
    };
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    const { data, error } = await this.supabase
      .from('Customer')
      .select()
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      name: data.name,
      tagid: data.tagid,
      mailingAddress: data.mailing_address,
      phoneNo: data.phone_no,
      createdAt: new Date(data.created_at),
    };
  }

  async getAllCustomers(): Promise<Customer[]> {
    const { data, error } = await this.supabase
      .from('Customer')
      .select()
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      name: row.name,
      tagid: row.tagid,
      mailingAddress: row.mailing_address,
      phoneNo: row.phone_no,
      createdAt: new Date(row.created_at),
    }));
  }

  async updateCustomer(id: number, data: UpdateCustomer): Promise<Customer | undefined> {
    const dbData: any = {};

    if ('name' in data && data.name !== undefined) dbData.name = data.name;
    if ('tagid' in data && data.tagid !== undefined) dbData.tagid = data.tagid;
    if ('mailingAddress' in data && data.mailingAddress !== undefined) dbData.mailing_address = data.mailingAddress;
    if ('phoneNo' in data && data.phoneNo !== undefined) dbData.phone_no = data.phoneNo;

    const { data: result, error } = await this.supabase
      .from('Customer')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!result) return undefined;

    return {
      id: result.id,
      name: result.name,
      tagid: result.tagid,
      mailingAddress: result.mailing_address,
      phoneNo: result.phone_no,
      createdAt: new Date(result.created_at),
    };
  }

  async deleteCustomer(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('Customer')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async createConversationMemory(data: InsertConversationMemory): Promise<ConversationMemory> {
    const dbData: any = {
      id: data.id,
      customer_id: data.customerId,
      conversation_data: data.conversationData,
    };

    if (data.message !== undefined) dbData.message = data.message;
    if (data.recipient !== undefined) dbData.recipient = data.recipient;
    if (data.sender !== undefined) dbData.sender = data.sender;
    if (data.tagid !== undefined) dbData.tagid = data.tagid;
    if (data.waName !== undefined) dbData.wa_name = data.waName;

    const { data: result, error } = await this.supabase
      .from('ConversationMemory')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;

    return {
      id: result.id,
      customerId: result.customer_id,
      conversationData: result.conversation_data,
      message: result.message,
      recipient: result.recipient,
      sender: result.sender,
      tagid: result.tagid,
      waName: result.wa_name,
      createdAt: new Date(result.created_at),
    };
  }

  async getConversationMemory(id: string): Promise<ConversationMemory | undefined> {
    const { data, error } = await this.supabase
      .from('ConversationMemory')
      .select()
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      customerId: data.customer_id,
      conversationData: data.conversation_data,
      message: data.message,
      recipient: data.recipient,
      sender: data.sender,
      tagid: data.tagid,
      waName: data.wa_name,
      createdAt: new Date(data.created_at),
    };
  }

  async getAllConversationMemories(): Promise<ConversationMemory[]> {
    const { data, error } = await this.supabase
      .from('ConversationMemory')
      .select()
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      customerId: row.customer_id,
      conversationData: row.conversation_data,
      message: row.message,
      recipient: row.recipient,
      sender: row.sender,
      tagid: row.tagid,
      waName: row.wa_name,
      createdAt: new Date(row.created_at),
    }));
  }

  async getConversationMemoriesByCustomerId(customerId: string): Promise<ConversationMemory[]> {
    const { data, error } = await this.supabase
      .from('ConversationMemory')
      .select()
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false});

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      customerId: row.customer_id,
      conversationData: row.conversation_data,
      message: row.message,
      recipient: row.recipient,
      sender: row.sender,
      tagid: row.tagid,
      waName: row.wa_name,
      createdAt: new Date(row.created_at),
    }));
  }

  async filterConversationMemories(filters: { customerId?: string; recipient?: string; sender?: string; waName?: string; tagid?: string }): Promise<ConversationMemory[]> {
    let query = this.supabase
      .from('ConversationMemory')
      .select()
      .order('created_at', { ascending: false });

    if (filters.customerId) {
      query = query.eq('customer_id', filters.customerId);
    }
    if (filters.recipient) {
      query = query.eq('recipient', filters.recipient);
    }
    if (filters.sender) {
      query = query.eq('sender', filters.sender);
    }
    if (filters.waName) {
      query = query.eq('wa_name', filters.waName);
    }
    if (filters.tagid) {
      query = query.eq('tagid', filters.tagid);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      customerId: row.customer_id,
      conversationData: row.conversation_data,
      message: row.message,
      recipient: row.recipient,
      sender: row.sender,
      tagid: row.tagid,
      waName: row.wa_name,
      createdAt: new Date(row.created_at),
    }));
  }

  async updateConversationMemory(id: string, data: UpdateConversationMemory): Promise<ConversationMemory | undefined> {
    const dbData: any = {};

    if (data.customerId !== undefined) dbData.customer_id = data.customerId;
    if (data.conversationData !== undefined) dbData.conversation_data = data.conversationData;
    if (data.message !== undefined) dbData.message = data.message;
    if (data.recipient !== undefined) dbData.recipient = data.recipient;
    if (data.sender !== undefined) dbData.sender = data.sender;
    if (data.tagid !== undefined) dbData.tagid = data.tagid;
    if (data.waName !== undefined) dbData.wa_name = data.waName;

    const { data: result, error } = await this.supabase
      .from('ConversationMemory')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!result) return undefined;

    return {
      id: result.id,
      customerId: result.customer_id,
      conversationData: result.conversation_data,
      message: result.message,
      recipient: result.recipient,
      sender: result.sender,
      tagid: result.tagid,
      waName: result.wa_name,
      createdAt: new Date(result.created_at),
    };
  }

  async deleteConversationMemory(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ConversationMemory')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async createIncident(data: InsertIncident): Promise<Incident> {
    const dbData: any = {};

    if (data.owner !== undefined) dbData.owner = data.owner;
    if (data.finder !== undefined) dbData.finder = data.finder;
    if (data.tagid !== undefined) dbData.tagid = data.tagid;

    const { data: result, error } = await this.supabase
      .from('Incident')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;

    return {
      id: result.id,
      owner: result.owner,
      finder: result.finder,
      tagid: result.tagid,
      createdAt: new Date(result.created_at),
    };
  }

  async getIncident(id: string): Promise<Incident | undefined> {
    const { data, error } = await this.supabase
      .from('Incident')
      .select()
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      owner: data.owner,
      finder: data.finder,
      tagid: data.tagid,
      createdAt: new Date(data.created_at),
    };
  }

  async getIncidentByTagid(tagid: string): Promise<Incident | undefined> {
    const { data, error } = await this.supabase
      .from('Incident')
      .select()
      .eq('tagid', tagid)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      owner: data.owner,
      finder: data.finder,
      tagid: data.tagid,
      createdAt: new Date(data.created_at),
    };
  }

  async getAllIncidents(): Promise<Incident[]> {
    const { data, error } = await this.supabase
      .from('Incident')
      .select()
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      owner: row.owner,
      finder: row.finder,
      tagid: row.tagid,
      createdAt: new Date(row.created_at),
    }));
  }

  async getIncidentsByCustomerId(customerId: string): Promise<Incident[]> {
    const { data, error } = await this.supabase
      .from('Incident')
      .select()
      .eq('tagid', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      owner: row.owner,
      finder: row.finder,
      tagid: row.tagid,
      createdAt: new Date(row.created_at),
    }));
  }

  async updateIncident(id: string, data: UpdateIncident): Promise<Incident | undefined> {
    const dbData: any = {};

    if (data.owner !== undefined) dbData.owner = data.owner;
    if (data.finder !== undefined) dbData.finder = data.finder;
    if (data.tagid !== undefined) dbData.tagid = data.tagid;

    const { data: result, error } = await this.supabase
      .from('Incident')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!result) return undefined;

    return {
      id: result.id,
      owner: result.owner,
      finder: result.finder,
      tagid: result.tagid,
      createdAt: new Date(result.created_at),
    };
  }

  async deleteIncident(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('Incident')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async createPreference(data: InsertPreference): Promise<Preference> {
    const dbData: any = {};

    if (data.description !== undefined) dbData.description = data.description;
    if (data.selectedValue !== undefined) dbData.selected_value = data.selectedValue;
    if (data.tagid !== undefined) dbData.tagid = data.tagid;

    const { data: result, error } = await this.supabase
      .from('Preference')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;

    return {
      id: result.id,
      description: result.description,
      selectedValue: result.selected_value,
      tagid: result.tagid,
      createdAt: new Date(result.created_at),
      updatedAt: new Date(result.updated_at),
    };
  }

  async getPreference(id: string): Promise<Preference | undefined> {
    const { data, error } = await this.supabase
      .from('Preference')
      .select()
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      description: data.description,
      selectedValue: data.selected_value,
      tagid: data.tagid,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async getAllPreferences(): Promise<Preference[]> {
    const { data, error } = await this.supabase
      .from('Preference')
      .select()
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      description: row.description,
      selectedValue: row.selected_value,
      tagid: row.tagid,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }));
  }

  async getPreferencesByCustomerId(customerId: string): Promise<Preference[]> {
    const { data, error } = await this.supabase
      .from('Preference')
      .select()
      .eq('tagid', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(row => ({
      id: row.id,
      description: row.description,
      selectedValue: row.selected_value,
      tagid: row.tagid,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }));
  }

  async updatePreference(id: string, data: UpdatePreference): Promise<Preference | undefined> {
    const dbData: any = {
      updated_at: new Date().toISOString()
    };

    if (data.description !== undefined) dbData.description = data.description;
    if (data.selectedValue !== undefined) dbData.selected_value = data.selectedValue;
    if (data.tagid !== undefined) dbData.tagid = data.tagid;

    const { data: result, error } = await this.supabase
      .from('Preference')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!result) return undefined;

    return {
      id: result.id,
      description: result.description,
      selectedValue: result.selected_value,
      tagid: result.tagid,
      createdAt: new Date(result.created_at),
      updatedAt: new Date(result.updated_at),
    };
  }

  async deletePreference(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('Preference')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getCustomerTagByTagid(tagid: string): Promise<any | undefined> {
    const { data, error } = await this.supabase
      .from('CustomerTag')
      .select()
      .eq('tagid', tagid)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return undefined;

    return data;
  }

  async getCustomerById(id: number): Promise<Customer | undefined> {
    const { data, error } = await this.supabase
      .from('Customer')
      .select()
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      name: data.name,
      tagid: data.tagid,
      mailingAddress: data.mailing_address,
      phoneNo: data.phone_no,
      createdAt: new Date(data.created_at),
    };
  }
}

export const storage = new SupabaseStorage();
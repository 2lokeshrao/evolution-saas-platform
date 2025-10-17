export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  plan: 'starter' | 'professional' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

export interface WhatsAppInstance {
  id: string;
  userId: string;
  instanceName: string;
  status: 'pending' | 'connected' | 'disconnected';
  phoneNumber?: string;
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  instanceId: string;
  phoneNumber: string;
  message: string;
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  userId: string;
  phoneNumber: string;
  name: string;
  email?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  messagesPerDay: number;
  maxInstances: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

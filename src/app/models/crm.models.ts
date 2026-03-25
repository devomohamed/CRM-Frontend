// CRM Models for Customers, Leads, Tasks, and Tickets

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PROSPECT';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PROSPECT';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST';
  source: 'WEBSITE' | 'EMAIL' | 'PHONE' | 'SOCIAL' | 'REFERRAL';
  assignedTo?: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLeadRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  source: 'WEBSITE' | 'EMAIL' | 'PHONE' | 'SOCIAL' | 'REFERRAL';
  score?: number;
}

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  value: number;
  probability: number;
  stage: 'PROSPECT' | 'NEGOTIATION' | 'PROPOSAL' | 'CLOSED_WON' | 'CLOSED_LOST';
  closeDate: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: Date;
  assignedTo?: string;
  relatedTo: 'CUSTOMER' | 'LEAD' | 'DEAL';
  relatedId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: Date;
  relatedTo: 'CUSTOMER' | 'LEAD' | 'DEAL';
  relatedId: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  customerId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface CreateTicketRequest {
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  customerId: string;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

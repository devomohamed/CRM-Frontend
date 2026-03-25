import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ticket, CreateTicketRequest, PaginationResponse } from '../models/crm.models';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/tickets';

  private mockTickets: Ticket[] = [
    {
      id: '1',
      subject: 'Login issue with dashboard',
      description: 'User cannot login to their account',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      customerId: '1',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-03-20')
    }
  ];

  getTickets(page: number = 1, limit: number = 10, status?: string, priority?: string): Observable<PaginationResponse<Ticket>> {
    // TODO: Replace with HTTP call
    let filtered = this.mockTickets;
    if (status) {
      filtered = filtered.filter(t => t.status === status);
    }
    if (priority) {
      filtered = filtered.filter(t => t.priority === priority);
    }

    return of({
      data: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    });
  }

  getTicketById(id: string): Observable<Ticket> {
    // TODO: Replace with HTTP call
    const ticket = this.mockTickets.find(t => t.id === id);
    return of(ticket!);
  }

  createTicket(data: CreateTicketRequest): Observable<Ticket> {
    // TODO: Replace with HTTP call
    const newTicket: Ticket = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: 'OPEN',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockTickets.push(newTicket);
    return of(newTicket);
  }

  updateTicket(id: string, data: Partial<CreateTicketRequest>): Observable<Ticket> {
    // TODO: Replace with HTTP call
    const index = this.mockTickets.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTickets[index] = {
        ...this.mockTickets[index],
        ...data,
        updatedAt: new Date()
      };
    }
    return of(this.mockTickets[index]);
  }

  updateTicketStatus(id: string, status: string): Observable<Ticket> {
    // TODO: Replace with HTTP call
    const index = this.mockTickets.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTickets[index].status = status as any;
      this.mockTickets[index].updatedAt = new Date();
    }
    return of(this.mockTickets[index]);
  }

  deleteTicket(id: string): Observable<void> {
    // TODO: Replace with HTTP call
    this.mockTickets = this.mockTickets.filter(t => t.id !== id);
    return of(void 0);
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lead, CreateLeadRequest, PaginationResponse } from '../models/crm.models';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/leads';

  private mockLeads: Lead[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1-555-0101',
      company: 'TechCorp',
      status: 'CONTACTED',
      source: 'WEBSITE',
      score: 85,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-03-15')
    }
  ];

  getLeads(page: number = 1, limit: number = 10, search?: string, status?: string): Observable<PaginationResponse<Lead>> {
    // TODO: Replace with HTTP call
    // return this.http.get<PaginationResponse<Lead>>(`${this.API_URL}?page=${page}&limit=${limit}`);
    
    let filtered = this.mockLeads;
    if (search) {
      filtered = filtered.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status) {
      filtered = filtered.filter(l => l.status === status);
    }

    return of({
      data: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    });
  }

  getLeadById(id: string): Observable<Lead> {
    // TODO: Replace with HTTP call
    const lead = this.mockLeads.find(l => l.id === id);
    return of(lead!);
  }

  createLead(data: CreateLeadRequest): Observable<Lead> {
    // TODO: Replace with HTTP call
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: 'NEW',
      score: data.score || 50,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockLeads.push(newLead);
    return of(newLead);
  }

  updateLead(id: string, data: Partial<CreateLeadRequest>): Observable<Lead> {
    // TODO: Replace with HTTP call
    const index = this.mockLeads.findIndex(l => l.id === id);
    if (index !== -1) {
      this.mockLeads[index] = {
        ...this.mockLeads[index],
        ...data,
        updatedAt: new Date()
      };
    }
    return of(this.mockLeads[index]);
  }

  updateLeadStatus(id: string, status: string): Observable<Lead> {
    // TODO: Replace with HTTP call
    const index = this.mockLeads.findIndex(l => l.id === id);
    if (index !== -1) {
      this.mockLeads[index].status = status as any;
      this.mockLeads[index].updatedAt = new Date();
    }
    return of(this.mockLeads[index]);
  }

  deleteLead(id: string): Observable<void> {
    // TODO: Replace with HTTP call
    this.mockLeads = this.mockLeads.filter(l => l.id !== id);
    return of(void 0);
  }
}

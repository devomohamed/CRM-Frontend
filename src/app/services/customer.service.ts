import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Customer, CreateCustomerRequest, PaginationResponse } from '../models/crm.models';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/customers';

  // Mock data for development
  private mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '+1-555-0001',
      company: 'Acme Corporation',
      status: 'ACTIVE',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-03-20')
    },
    {
      id: '2',
      name: 'TechStart Inc',
      email: 'info@techstart.com',
      phone: '+1-555-0002',
      company: 'TechStart',
      status: 'ACTIVE',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-03-18')
    }
  ];

  getCustomers(page: number = 1, limit: number = 10, search?: string): Observable<PaginationResponse<Customer>> {
    // TODO: Replace with actual HTTP call when backend is ready
    // return this.http.get<PaginationResponse<Customer>>(
    //   `${this.API_URL}?page=${page}&limit=${limit}&search=${search || ''}`
    // );
    
    let filtered = this.mockCustomers;
    if (search) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return of({
      data: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    });
  }

  getCustomerById(id: string): Observable<Customer> {
    // TODO: Replace with actual HTTP call
    // return this.http.get<Customer>(`${this.API_URL}/${id}`);
    const customer = this.mockCustomers.find(c => c.id === id);
    return of(customer!);
  }

  createCustomer(data: CreateCustomerRequest): Observable<Customer> {
    // TODO: Replace with actual HTTP call
    // return this.http.post<Customer>(this.API_URL, data);
    const newCustomer: Customer = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockCustomers.push(newCustomer);
    return of(newCustomer);
  }

  updateCustomer(id: string, data: Partial<CreateCustomerRequest>): Observable<Customer> {
    // TODO: Replace with actual HTTP call
    // return this.http.put<Customer>(`${this.API_URL}/${id}`, data);
    const index = this.mockCustomers.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCustomers[index] = {
        ...this.mockCustomers[index],
        ...data,
        updatedAt: new Date()
      };
    }
    return of(this.mockCustomers[index]);
  }

  deleteCustomer(id: string): Observable<void> {
    // TODO: Replace with actual HTTP call
    // return this.http.delete<void>(`${this.API_URL}/${id}`);
    this.mockCustomers = this.mockCustomers.filter(c => c.id !== id);
    return of(void 0);
  }
}

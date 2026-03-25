import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task, CreateTaskRequest, PaginationResponse } from '../models/crm.models';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/tasks';

  private mockTasks: Task[] = [
    {
      id: '1',
      title: 'Follow up with customer',
      description: 'Call customer to discuss proposal',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: new Date('2024-03-30'),
      relatedTo: 'LEAD',
      relatedId: '1',
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-03-20')
    }
  ];

  getTasks(page: number = 1, limit: number = 10, status?: string, priority?: string): Observable<PaginationResponse<Task>> {
    // TODO: Replace with HTTP call
    let filtered = this.mockTasks;
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

  getTaskById(id: string): Observable<Task> {
    // TODO: Replace with HTTP call
    const task = this.mockTasks.find(t => t.id === id);
    return of(task!);
  }

  createTask(data: CreateTaskRequest): Observable<Task> {
    // TODO: Replace with HTTP call
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: 'TODO',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockTasks.push(newTask);
    return of(newTask);
  }

  updateTask(id: string, data: Partial<CreateTaskRequest>): Observable<Task> {
    // TODO: Replace with HTTP call
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTasks[index] = {
        ...this.mockTasks[index],
        ...data,
        updatedAt: new Date()
      };
    }
    return of(this.mockTasks[index]);
  }

  updateTaskStatus(id: string, status: string): Observable<Task> {
    // TODO: Replace with HTTP call
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTasks[index].status = status as any;
      this.mockTasks[index].updatedAt = new Date();
    }
    return of(this.mockTasks[index]);
  }

  deleteTask(id: string): Observable<void> {
    // TODO: Replace with HTTP call
    this.mockTasks = this.mockTasks.filter(t => t.id !== id);
    return of(void 0);
  }
}

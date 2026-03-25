import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { TaskService } from '../../services/task.service';
import { Task, CreateTaskRequest } from '../../models/crm.models';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  tasks = signal<Task[]>([]);
  loading = signal(false);
  showDialog = signal(false);
  isEditing = signal(false);
  editingId = signal<string | null>(null);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    priority: ['MEDIUM', Validators.required],
    dueDate: [new Date(), Validators.required],
    relatedTo: ['LEAD', Validators.required],
    relatedId: ['1', Validators.required]
  });

  statusOptions = [
    { label: 'To Do', value: 'TODO' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' }
  ];

  priorityOptions = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' },
    { label: 'Urgent', value: 'URGENT' }
  ];

  relatedToOptions = [
    { label: 'Customer', value: 'CUSTOMER' },
    { label: 'Lead', value: 'LEAD' },
    { label: 'Deal', value: 'DEAL' }
  ];

  constructor() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load tasks' });
        this.loading.set(false);
      }
    });
  }

  openDialog(task?: Task): void {
    if (task) {
      this.isEditing.set(true);
      this.editingId.set(task.id);
      this.form.patchValue({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        relatedTo: task.relatedTo,
        relatedId: task.relatedId
      });
    } else {
      this.isEditing.set(false);
      this.editingId.set(null);
      this.form.reset({ priority: 'MEDIUM', relatedTo: 'LEAD', relatedId: '1', dueDate: new Date() });
    }
    this.showDialog.set(true);
  }

  saveTask(): void {
    if (this.form.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill all required fields' });
      return;
    }

    const data = this.form.value as CreateTaskRequest;

    if (this.isEditing() && this.editingId()) {
      this.taskService.updateTask(this.editingId()!, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated' });
          this.showDialog.set(false);
          this.loadTasks();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update task' });
        }
      });
    } else {
      this.taskService.createTask(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task created' });
          this.showDialog.set(false);
          this.loadTasks();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create task' });
        }
      });
    }
  }

  updateTaskStatus(task: Task, newStatus: string): void {
    this.taskService.updateTaskStatus(task.id, newStatus).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task status updated' });
        this.loadTasks();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update status' });
      }
    });
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task deleted' });
          this.loadTasks();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete task' });
        }
      });
    }
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}

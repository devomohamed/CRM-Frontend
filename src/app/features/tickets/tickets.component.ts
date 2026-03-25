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
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { TicketService } from '../../services/ticket.service';
import { Ticket, CreateTicketRequest } from '../../models/crm.models';

@Component({
  selector: 'app-tickets',
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
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent {
  private ticketService = inject(TicketService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  tickets = signal<Ticket[]>([]);
  loading = signal(false);
  showDialog = signal(false);
  isEditing = signal(false);
  editingId = signal<string | null>(null);

  form = this.fb.group({
    subject: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', Validators.required],
    priority: ['MEDIUM', Validators.required],
    customerId: ['1', Validators.required]
  });

  statusOptions = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Resolved', value: 'RESOLVED' },
    { label: 'Closed', value: 'CLOSED' }
  ];

  priorityOptions = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' },
    { label: 'Urgent', value: 'URGENT' }
  ];

  constructor() {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading.set(true);
    this.ticketService.getTickets().subscribe({
      next: (response) => {
        this.tickets.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load tickets' });
        this.loading.set(false);
      }
    });
  }

  openDialog(ticket?: Ticket): void {
    if (ticket) {
      this.isEditing.set(true);
      this.editingId.set(ticket.id);
      this.form.patchValue({
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority,
        customerId: ticket.customerId
      });
    } else {
      this.isEditing.set(false);
      this.editingId.set(null);
      this.form.reset({ priority: 'MEDIUM', customerId: '1' });
    }
    this.showDialog.set(true);
  }

  saveTicket(): void {
    if (this.form.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill all required fields' });
      return;
    }

    const data = this.form.value as CreateTicketRequest;

    if (this.isEditing() && this.editingId()) {
      this.ticketService.updateTicket(this.editingId()!, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket updated' });
          this.showDialog.set(false);
          this.loadTickets();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update ticket' });
        }
      });
    } else {
      this.ticketService.createTicket(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket created' });
          this.showDialog.set(false);
          this.loadTickets();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create ticket' });
        }
      });
    }
  }

  updateTicketStatus(ticket: Ticket, newStatus: string): void {
    this.ticketService.updateTicketStatus(ticket.id, newStatus).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket status updated' });
        this.loadTickets();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update status' });
      }
    });
  }

  deleteTicket(id: string): void {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket deleted' });
          this.loadTickets();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete ticket' });
        }
      });
    }
  }

  trackByTicketId(index: number, ticket: Ticket): string {
    return ticket.id;
  }
}

import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../services/customer.service';
import { Customer, CreateCustomerRequest } from '../../models/crm.models';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  customers = signal<Customer[]>([]);
  loading = signal(false);
  showDialog = signal(false);
  isEditing = signal(false);
  editingId = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    company: ['', Validators.required],
    status: ['ACTIVE', Validators.required]
  });

  statusOptions = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
    { label: 'Prospect', value: 'PROSPECT' }
  ];

  constructor() {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading.set(true);
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        this.customers.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load customers' });
        this.loading.set(false);
      }
    });
  }

  openDialog(customer?: Customer): void {
    if (customer) {
      this.isEditing.set(true);
      this.editingId.set(customer.id);
      this.form.patchValue({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        company: customer.company,
        status: customer.status
      });
    } else {
      this.isEditing.set(false);
      this.editingId.set(null);
      this.form.reset({ status: 'ACTIVE' });
    }
    this.showDialog.set(true);
  }

  saveCustomer(): void {
    if (this.form.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill all required fields' });
      return;
    }

    const data = this.form.value as CreateCustomerRequest;
    
    if (this.isEditing() && this.editingId()) {
      this.customerService.updateCustomer(this.editingId()!, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer updated' });
          this.showDialog.set(false);
          this.loadCustomers();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update customer' });
        }
      });
    } else {
      this.customerService.createCustomer(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer created' });
          this.showDialog.set(false);
          this.loadCustomers();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create customer' });
        }
      });
    }
  }

  deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer deleted' });
          this.loadCustomers();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete customer' });
        }
      });
    }
  }

  trackByCustomerId(index: number, customer: Customer): string {
    return customer.id;
  }
}

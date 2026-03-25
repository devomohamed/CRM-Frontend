import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { LeadService } from '../../services/lead.service';
import { Lead, CreateLeadRequest } from '../../models/crm.models';

@Component({
  selector: 'app-leads',
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
    InputNumberModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsComponent {
  private leadService = inject(LeadService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  leads = signal<Lead[]>([]);
  loading = signal(false);
  showDialog = signal(false);
  isEditing = signal(false);
  editingId = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    company: ['', Validators.required],
    source: ['WEBSITE', Validators.required],
    score: [50, [Validators.required, Validators.min(0), Validators.max(100)]]
  });

  sourceOptions = [
    { label: 'Website', value: 'WEBSITE' },
    { label: 'Email', value: 'EMAIL' },
    { label: 'Phone', value: 'PHONE' },
    { label: 'Social Media', value: 'SOCIAL' },
    { label: 'Referral', value: 'REFERRAL' }
  ];

  constructor() {
    this.loadLeads();
  }

  loadLeads(): void {
    this.loading.set(true);
    this.leadService.getLeads().subscribe({
      next: (response) => {
        this.leads.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load leads' });
        this.loading.set(false);
      }
    });
  }

  openDialog(lead?: Lead): void {
    if (lead) {
      this.isEditing.set(true);
      this.editingId.set(lead.id);
      this.form.patchValue({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        source: lead.source,
        score: lead.score
      });
    } else {
      this.isEditing.set(false);
      this.editingId.set(null);
      this.form.reset({ source: 'WEBSITE', score: 50 });
    }
    this.showDialog.set(true);
  }

  saveLead(): void {
    if (this.form.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill all required fields' });
      return;
    }

    const data = this.form.value as CreateLeadRequest;

    if (this.isEditing() && this.editingId()) {
      this.leadService.updateLead(this.editingId()!, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lead updated' });
          this.showDialog.set(false);
          this.loadLeads();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update lead' });
        }
      });
    } else {
      this.leadService.createLead(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lead created' });
          this.showDialog.set(false);
          this.loadLeads();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create lead' });
        }
      });
    }
  }

  deleteLead(id: string): void {
    if (confirm('Are you sure you want to delete this lead?')) {
      this.leadService.deleteLead(id).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lead deleted' });
          this.loadLeads();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete lead' });
        }
      });
    }
  }

  trackByLeadId(index: number, lead: Lead): string {
    return lead.id;
  }
}

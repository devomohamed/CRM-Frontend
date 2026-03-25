import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    ToggleSwitch,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  companyForm = this.fb.group({
    companyName: ['Acme CRM', Validators.required],
    email: ['admin@acmecrm.com', [Validators.required, Validators.email]],
    phone: ['+1-555-0000', Validators.required],
    website: ['https://acmecrm.com', Validators.required],
    timezone: ['UTC', Validators.required],
    currency: ['USD', Validators.required]
  });

  notificationForm = this.fb.group({
    emailNotifications: [true],
    pushNotifications: [true],
    smsNotifications: [false],
    weeklyDigest: [true],
    monthlyReport: [true]
  });

  timezoneOptions = [
    { label: 'UTC', value: 'UTC' },
    { label: 'EST', value: 'EST' },
    { label: 'CST', value: 'CST' },
    { label: 'MST', value: 'MST' },
    { label: 'PST', value: 'PST' }
  ];

  currencyOptions = [
    { label: 'USD ($)', value: 'USD' },
    { label: 'EUR (€)', value: 'EUR' },
    { label: 'GBP (£)', value: 'GBP' },
    { label: 'AED (د.إ)', value: 'AED' }
  ];

  saveCompanySettings(): void {
    if (this.companyForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill all required fields' });
      return;
    }

    // TODO: Call API to save settings
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company settings saved' });
  }

  saveNotifications(): void {
    // TODO: Call API to save notification preferences
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notification preferences saved' });
  }
}

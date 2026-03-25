import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardModule, ButtonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsComponent {
  reports = [
    {
      id: 'sales-pipeline',
      title: 'Sales Pipeline',
      description: 'Track deals through different stages of the sales process',
      icon: 'pi pi-chart-bar'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      description: 'Monthly and annual revenue analytics',
      icon: 'pi pi-wallet'
    },
    {
      id: 'customer-analysis',
      title: 'Customer Analysis',
      description: 'Customer demographics and engagement metrics',
      icon: 'pi pi-users'
    },
    {
      id: 'team-performance',
      title: 'Team Performance',
      description: 'Sales team metrics and individual performance',
      icon: 'pi pi-chart-pie'
    },
    {
      id: 'lead-conversion',
      title: 'Lead Conversion',
      description: 'Lead to customer conversion rates and trends',
      icon: 'pi pi-arrow-right'
    },
    {
      id: 'activity',
      title: 'Activity',
      description: 'Calls, emails, meetings and task completion',
      icon: 'pi pi-list'
    }
  ];

  downloadReport(reportId: string): void {
    console.log('Downloading report:', reportId);
  }
}

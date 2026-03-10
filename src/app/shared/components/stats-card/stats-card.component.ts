import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-stats-card',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm font-bold text-slate-500 uppercase tracking-wider">{{ label }}</p>
        <div class="p-2.5 rounded-xl text-white" [ngClass]="colorClass">
          <lucide-angular *ngIf="icon" [img]="icon" [size]="20"></lucide-angular>
        </div>
      </div>
      <div class="mt-auto">
        <h3 class="text-3xl font-black text-slate-900 tracking-tight">{{ value }}</h3>
        <div *ngIf="trend" class="flex items-center gap-1.5 mt-2 text-sm font-semibold" 
             [ngClass]="trend.isPositive ? 'text-green-600' : 'text-red-500'">
          <span>{{ trend.value }}</span>
          <span class="text-slate-400 font-medium ml-1">{{ trend.label }}</span>
        </div>
      </div>
    </div>
  `
})
export class StatsCardComponent {
    @Input() label = '';
    @Input() value: string | number = '';
    @Input() icon: any;
    @Input() colorClass = 'bg-blue-600';
    @Input() trend?: { value: string; label: string; isPositive: boolean };
}

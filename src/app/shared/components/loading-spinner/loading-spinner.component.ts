import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    imports: [CommonModule, ProgressSpinnerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div [ngClass]="fullPage ? 'fixed inset-0 bg-white/60 backdrop-blur-[2px] z-[9999]' : 'relative min-h-[100px]'" 
         class="flex items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <p-progressSpinner 
          styleClass="w-12 h-12" 
          strokeWidth="4" 
          fill="transparent" 
          animationDuration=".5s">
        </p-progressSpinner>
        <p *ngIf="message" class="text-sm font-bold text-slate-600 animate-pulse tracking-wide uppercase">{{ message }}</p>
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {
    @Input() fullPage = false;
    @Input() message?: string;
}

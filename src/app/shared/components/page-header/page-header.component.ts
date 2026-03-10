import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-page-header',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h2 class="text-3xl font-black tracking-tight text-slate-900">{{ title }}</h2>
        @if (subtitle) {
          <p class="text-slate-500 font-medium mt-1">{{ subtitle }}</p>
        }
      </div>
      <div class="flex items-center gap-3">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class PageHeaderComponent {
    @Input({ required: true }) title!: string;
    @Input() subtitle?: string;
}

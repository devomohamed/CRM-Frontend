import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
    selector: 'app-filter-bar',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, LucideAngularModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center mb-6">
      <div class="flex-1 w-full relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <lucide-angular [img]="SearchIcon" [size]="18"></lucide-angular>
        </div>
        <input 
          pInputText 
          type="text" 
          [placeholder]="placeholder" 
          [ngModel]="searchTerm"
          (ngModelChange)="onSearchChange($event)"
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" />
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class FilterBarComponent {
    @Input() placeholder = 'Search...';
    @Input() searchTerm = '';
    @Output() search = new EventEmitter<string>();

    readonly SearchIcon = Search;

    onSearchChange(value: string) {
        this.search.emit(value);
    }
}

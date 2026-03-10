import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule } from 'lucide-angular';
import { SelectModule } from 'primeng/select';

export interface Column {
  field: string;
  header: string;
  type?: 'text' | 'numeric' | 'date' | 'boolean' | 'status';
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    TagModule,
    ButtonModule,
    LucideAngularModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <p-table 
        #dt
        [value]="value" 
        [columns]="columns"
        [lazy]="lazy"
        (onLazyLoad)="onLazyLoad.emit($event)"
        [totalRecords]="totalRecords"
        [rows]="rows"
        [paginator]="paginator"
        [rowsPerPageOptions]="[10, 20, 50]"
        [loading]="loading"
        [rowTrackBy]="rowTrackBy"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        styleClass="p-datatable-sm"
        responsiveLayout="scroll"
        dataKey="id"
        >
        <ng-template pTemplate="header" let-columns>
          <tr>
            <th *ngFor="let col of columns" 
                [pSortableColumn]="col.sortable ? col.field : undefined"
                [style.width]="col.width"
                class="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] px-6 py-4 border-b border-slate-100">
              <div class="flex items-center gap-2">
                {{ col.header }}
                <p-sortIcon *ngIf="col.sortable" [field]="col.field"></p-sortIcon>
              </div>
            </th>
            <th *ngIf="actionTemplate" class="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] px-6 py-4 border-b border-slate-100 w-24">
              Actions
            </th>
          </tr>
          <tr *ngIf="hasFilters">
            <th *ngFor="let col of columns" class="bg-slate-50 px-6 py-2 border-b border-slate-100">
              <span *ngIf="col.filterable" class="p-input-icon-left w-full">
                <i class="pi pi-search text-slate-400 text-xs translate-y-[-2px]"></i>
                <input 
                  pInputText 
                  type="text" 
                  (input)="dt.filter($any($event.target).value, col.field, 'contains')" 
                  [placeholder]="'Search ' + col.header" 
                  class="w-full text-xs py-1.5 pl-8 bg-white border-slate-200 rounded-lg" />
              </span>
            </th>
            <th *ngIf="actionTemplate" class="bg-slate-50 border-b border-slate-100"></th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-rowData let-columns="columns">
          <tr class="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
            <td *ngFor="let col of columns" class="px-6 py-4 text-sm text-slate-700">
              <ng-container *ngIf="!bodyTemplate">
                {{ rowData[col.field] }}
              </ng-container>
              <ng-container *ngIf="bodyTemplate">
                <ng-template [ngTemplateOutlet]="bodyTemplate" [ngTemplateOutletContext]="{ $implicit: rowData, col: col }"></ng-template>
              </ng-container>
            </td>
            <td *ngIf="actionTemplate" class="px-6 py-4 text-sm text-slate-700 text-right">
              <ng-template [ngTemplateOutlet]="actionTemplate" [ngTemplateOutletContext]="{ $implicit: rowData }"></ng-template>
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="emptymessage">
          <tr>
            <td [attr.colspan]="columns.length + (actionTemplate ? 1 : 0)" class="text-center p-12 text-slate-400 italic font-medium">
              <div class="flex flex-col items-center gap-2">
                <i class="pi pi-inbox text-3xl"></i>
                <span>No records found</span>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class DataTableComponent {
  @Input() value: any[] = [];
  @Input() columns: Column[] = [];
  @Input() lazy: boolean = false;
  @Input() loading: boolean = false;
  @Input() totalRecords: number = 0;
  @Input() rows: number = 10;
  @Input() paginator: boolean = true;
  @Input() rowTrackBy: (index: number, item: any) => any = (index, item) => item.id || index;

  @Output() onLazyLoad = new EventEmitter<TableLazyLoadEvent>();

  @ContentChild('bodyTemplate') bodyTemplate?: TemplateRef<any>;
  @ContentChild('actionTemplate') actionTemplate?: TemplateRef<any>;

  get hasFilters(): boolean {
    return this.columns.some(col => col.filterable);
  }
}

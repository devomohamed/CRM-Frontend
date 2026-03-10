import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LayoutDashboard, Users, Zap, Briefcase, CheckSquare, Ticket, FileText, Settings } from 'lucide-angular';
import { LayoutService } from '../service/layout';
import { AuthService } from '../../core/auth/auth.service';

interface NavItem {
  icon: any;
  label: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="space-y-1.5 flex flex-col h-full">
      <!-- Main Nav Items -->
      <div class="flex-1 overflow-y-auto">
        <div class="space-y-1">
          @for (item of mainNavItems; track trackByRoute($index, item)) {
            @if (hasRole(item.roles)) {
              <a 
                [routerLink]="item.route"
                routerLinkActive="bg-blue-600 text-white shadow-lg shadow-blue-100"
                #rla="routerLinkActive"
                [class.bg-blue-600]="rla.isActive"
                [class.text-white]="rla.isActive"
                [class.text-slate-600]="!rla.isActive"
                [class.hover:bg-slate-50]="!rla.isActive"
                [class.hover:text-blue-600]="!rla.isActive"
                class="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer group"
                (click)="closeSidebarOnMobile()">
                <lucide-angular 
                  [img]="item.icon" 
                  [size]="18" 
                  [class.group-hover:translate-x-1]="!rla.isActive"
                  class="transition-transform">
                </lucide-angular>
                {{ item.label | translate }}
              </a>
            }
          }
        </div>

        <div class="py-4"><div class="h-[1px] bg-slate-100"></div></div>
        
        <!-- Support Nav Items -->
        <p class="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{{ 'NAV.SUPPORT' | translate | uppercase }}</p>
        <div class="space-y-1">
          @for (item of supportNavItems; track trackByRoute($index, item)) {
            @if (hasRole(item.roles)) {
              <a 
                [routerLink]="item.route"
                routerLinkActive="bg-blue-600 text-white shadow-lg shadow-blue-100"
                #rla="routerLinkActive"
                [class.bg-blue-600]="rla.isActive"
                [class.text-white]="rla.isActive"
                [class.text-slate-600]="!rla.isActive"
                [class.hover:bg-slate-50]="!rla.isActive"
                [class.hover:text-blue-600]="!rla.isActive"
                class="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer group"
                (click)="closeSidebarOnMobile()">
                <lucide-angular 
                  [img]="item.icon" 
                  [size]="18" 
                  [class.group-hover:translate-x-1]="!rla.isActive"
                  class="transition-transform">
                </lucide-angular>
                {{ item.label | translate }}
              </a>
            }
          }
        </div>
      </div>

      <!-- Storage Widget -->
      <div class="mt-auto pt-4 border-t border-slate-100">
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p class="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">Storage</p>
          <div class="h-1.5 bg-slate-200 rounded-full overflow-hidden">
             <div class="h-full bg-blue-600 rounded-full w-[70%]"></div>
          </div>
          <p class="text-[10px] text-slate-500 mt-2 font-medium">70% of 10GB used</p>
        </div>
      </div>
    </nav>
  `
})
export class AppSidebarComponent {
  private layoutService = inject(LayoutService);
  private authService = inject(AuthService);

  readonly mainNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'NAV.DASHBOARD', route: '/dashboard' },
    { icon: Users, label: 'NAV.CUSTOMERS', route: '/customers', roles: ['ADMIN', 'MANAGER'] },
    { icon: Zap, label: 'NAV.LEADS', route: '/leads', roles: ['ADMIN', 'MANAGER', 'USER'] },
    { icon: Briefcase, label: 'NAV.DEALS', route: '/deals' },
    { icon: CheckSquare, label: 'NAV.TASKS', route: '/tasks' }
  ];

  readonly supportNavItems: NavItem[] = [
    { icon: Ticket, label: 'NAV.TICKETS', route: '/tickets' },
    { icon: FileText, label: 'NAV.REPORTS', route: '/reports', roles: ['ADMIN', 'MANAGER'] },
    { icon: Settings, label: 'NAV.SETTINGS', route: '/settings', roles: ['ADMIN'] }
  ];

  hasRole(roles?: string[]): boolean {
    return this.authService.hasRole(roles as any[]);
  }

  // Implementing tracking performance rule #9
  trackByRoute(index: number, item: NavItem): string {
    return item.route;
  }

  // Close the drawer if on mobile
  closeSidebarOnMobile(): void {
    if (window.innerWidth < 1024) {
      this.layoutService.closeSidebar();
    }
  }
}

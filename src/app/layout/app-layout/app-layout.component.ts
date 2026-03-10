import { Component, ChangeDetectionStrategy, inject, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LayoutDashboard } from 'lucide-angular';

import { AppTopbarComponent } from '../app-topbar/app-topbar.component';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { AppFooterComponent } from '../app-footer/app-footer.component';
import { LayoutService } from '../service/layout';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        DrawerModule,
        TranslateModule,
        LucideAngularModule,
        AppTopbarComponent,
        AppSidebarComponent,
        AppFooterComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="min-h-screen bg-slate-50 flex flex-col">
      <!-- Topbar -->
      <app-topbar></app-topbar>

      <div class="flex flex-1 relative">
        <!-- Desktop Sidebar -->
        <aside class="w-64 bg-white border-r border-slate-200 p-5 hidden lg:block sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto overflow-x-hidden">
          <app-sidebar></app-sidebar>
        </aside>

        <!-- Mobile Drawer (PrimeNG) -->
        <p-drawer 
          [visible]="layoutService.isSidebarVisible()"
          (visibleChange)="onDrawerChange($event)"
          [position]="layoutService.currentLang() === 'ar' ? 'right' : 'left'" 
          styleClass="w-full max-w-[280px]">
          <div class="px-2 pt-2 h-full flex flex-col">
             <div class="flex items-center gap-3 mb-8 px-4">
                <div class="bg-blue-600 p-2 rounded-lg text-white">
                   <lucide-angular [img]="DashboardIcon" [size]="20"></lucide-angular>
                </div>
                <span class="font-bold text-lg text-slate-900 tracking-tight">{{ 'APP.TITLE' | translate }}</span>
             </div>
             <!-- Sidebar Component reused inside Drawer -->
             <div class="flex-1 overflow-y-auto">
               <app-sidebar></app-sidebar>
             </div>
          </div>
        </p-drawer>

        <!-- Main Content Area -->
        <main class="flex-1 overflow-x-hidden flex flex-col min-h-[calc(100vh-73px)]">
          <div class="p-4 md:p-8 lg:p-10 flex-1 max-w-[1600px] w-full mx-auto">
             <router-outlet></router-outlet>
          </div>
          <app-footer></app-footer>
        </main>
      </div>
    </div>
  `
})
export class AppLayoutComponent {
    layoutService = inject(LayoutService);
    readonly DashboardIcon = LayoutDashboard;

    // Handle drawer visibility changes (e.g., clicking mask to close)
    onDrawerChange(isVisible: boolean) {
        if (!isVisible) {
            this.layoutService.closeSidebar();
        }
    }

    // Ensure drawer closes on window resize if transitioning to desktop
    @HostListener('window:resize')
    onResize() {
        if (window.innerWidth >= 1024 && this.layoutService.isSidebarVisible()) {
            this.layoutService.closeSidebar();
        }
    }
}

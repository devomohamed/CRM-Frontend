import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LayoutService } from '../service/layout';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { LucideAngularModule, Menu, Globe, LayoutDashboard } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [ButtonModule, AvatarModule, LucideAngularModule, TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <header class="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-[100] shadow-sm h-[73px]">
      <div class="flex items-center gap-2 md:gap-3">
        <!-- Mobile Menu Button -->
        <button 
          (click)="layoutService.toggleSidebar()"
          class="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
          <lucide-angular [img]="MenuIcon" [size]="20"></lucide-angular>
        </button>

        <div class="bg-blue-600 p-2 md:p-2.5 rounded-xl text-white shadow-md">
          <lucide-angular [img]="DashboardIcon" [size]="22"></lucide-angular>
        </div>
        <div>
          <h1 class="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-none">{{ 'APP.TITLE' | translate }}</h1>
          <p class="text-[10px] md:text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{{ 'APP.SUBTITLE' | translate }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 md:gap-4">
        <!-- Language Toggle -->
        <p-button 
          (click)="layoutService.toggleLanguage()"
          [rounded]="true" 
          [text]="true" 
          severity="secondary"
          styleClass="p-2 transition-transform active:scale-95">
          <div class="flex items-center gap-2">
            <lucide-angular [img]="GlobeIcon" [size]="18"></lucide-angular>
            <span class="text-sm font-bold uppercase hidden sm:inline">{{ layoutService.currentLang() }}</span>
          </div>
        </p-button>

        <div class="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

        <!-- User Profile Dropdown (Placeholder for Auth) -->
        <div class="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors">
          <p-avatar 
            image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
            shape="circle" 
            size="normal"
            styleClass="ring-2 ring-slate-100 ring-offset-1">
          </p-avatar>
          <div class="hidden md:block text-left">
            <p class="text-sm font-bold text-slate-900 leading-none">Admin User</p>
            <p class="text-[10px] text-slate-500 font-medium mt-0.5">Manager</p>
          </div>
        </div>
      </div>
    </header>
  `
})
export class AppTopbarComponent {
    layoutService = inject(LayoutService);

    readonly MenuIcon = Menu;
    readonly GlobeIcon = Globe;
    readonly DashboardIcon = LayoutDashboard;
}

import { Injectable, signal, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private translate = inject(TranslateService);

  // States
  readonly isSidebarVisible = signal(false);
  readonly currentLang = signal('en');

  constructor() {
    this.initLanguageState();

    // Effect to handle HTML document RTL/LTR whenever lang changes
    effect(() => {
      const lang = this.currentLang();
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    });
  }

  private initLanguageState(): void {
    const defaultLang = 'en';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.currentLang.set(defaultLang);
  }

  toggleSidebar(): void {
    this.isSidebarVisible.update((visible) => !visible);
  }

  closeSidebar(): void {
    this.isSidebarVisible.set(false);
  }

  toggleLanguage(): void {
    const nextLang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.currentLang.set(nextLang);
    this.translate.use(nextLang);
  }
}

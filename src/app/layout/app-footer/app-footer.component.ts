import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <footer class="mt-auto py-4 px-6 border-t border-slate-200 bg-white shadow-sm flex items-center justify-between text-xs text-slate-500 font-medium">
      <p>&copy; 2026 Angular CRM. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="#" class="hover:text-blue-600 transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-blue-600 transition-colors">Terms of Service</a>
      </div>
    </footer>
  `
})
export class AppFooterComponent { }

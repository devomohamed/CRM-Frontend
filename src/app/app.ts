import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private translate = inject(TranslateService);
  protected readonly title = signal('crm');

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    // Ensure document lang direction is set even before layout service loads
    effect(() => {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    });
  }
}

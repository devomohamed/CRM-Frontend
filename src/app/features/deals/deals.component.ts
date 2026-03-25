import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DealsComponent {}

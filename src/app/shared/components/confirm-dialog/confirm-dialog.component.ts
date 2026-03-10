import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- Note: This component acts as a wrapper for PrimeNG's global p-confirmDialog.
         Usage is via PrimeNG's ConfirmationService in other components. -->
  `
})
export class ConfirmDialogComponent { }

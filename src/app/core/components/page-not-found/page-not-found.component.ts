import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <style>
    :host {
      text-align: center;
    }
  </style>
    <mat-card>
      <mat-card-title>404: Page Not Found</mat-card-title>
      <mat-card-content>
        We couldn't find that page! Not even with x-ray vision.
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/">
        Take Me Home
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class PageNotFoundComponent {}

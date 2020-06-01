import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  exports: [
    MatSnackBarModule,
    MatProgressBarModule
  ]
})
export class AppMaterialModule { }

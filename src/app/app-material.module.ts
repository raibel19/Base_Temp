import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  exports: [
    // MatButtonModule,
    MatSnackBarModule,
    // MatIconModule,
    MatProgressBarModule,
    MatMomentDateModule
  ]
})
export class AppMaterialModule { }

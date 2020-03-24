import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesMaterialModule } from './templates-material.module';
import { SnackbarIndexComponent } from './snackbar/snackbar-index/snackbar-index.component';
import { ErrorIndexComponent } from './error/error-index/error-index.component';
import { ErrorAlternativeComponent } from './error/error-alternative/error-alternative.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SnackbarIndexComponent, ErrorIndexComponent, ErrorAlternativeComponent],
  imports: [
    CommonModule,
    RouterModule,
    TemplatesMaterialModule
  ],
  entryComponents: [SnackbarIndexComponent]
})
export class TemplatesModule { }

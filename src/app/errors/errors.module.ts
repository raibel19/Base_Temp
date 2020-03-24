import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorsService } from '../services/errors/errors.service';
import { ErrorsHandler } from './handle/errors-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from '../interceptors/error/error-interceptor.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    ErrorsService,
    {
      provide: ErrorHandler, useClass: ErrorsHandler
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true
    }
  ]
})
export class ErrorsModule { }

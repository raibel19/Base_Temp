import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { LogMaterialModule } from './log-material.module';
import { LogIndexComponent } from './log-index/log-index.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
// import { MainLayoutModule } from 'src/app/layouts/main-layout.module';


@NgModule({
  declarations: [LogIndexComponent],
  imports: [
    CommonModule,
    LogRoutingModule,
    LogMaterialModule,
    NgxJsonViewerModule,
    // MainLayoutModule
  ]
})
export class LogModule { }

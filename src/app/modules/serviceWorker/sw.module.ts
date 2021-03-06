import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SwRoutingModule } from './sw-routing.module';
import { SwNotificationIndexComponent } from './sw-notification-index/sw-notification-index.component';
import { SwMaterialModule } from './sw-material.module';
// import { MainLayoutModule } from 'src/app/layouts/main-layout.module';


@NgModule({
  declarations: [SwNotificationIndexComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwRoutingModule,
    SwMaterialModule,
    // MainLayoutModule
  ]
})
export class SwModule { }

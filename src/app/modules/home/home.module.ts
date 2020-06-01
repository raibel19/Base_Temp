import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeIndexComponent } from './home-index/home-index.component';
// import { MainLayoutModule } from 'src/app/layouts/main-layout.module';


@NgModule({
  declarations: [HomeIndexComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // MainLayoutModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutMaterialModule } from './main-layout-material.module';
import { MainLayoutHeaderComponent } from './main-layout-header/main-layout-header.component';
import { MainLayoutIndexComponent } from './main-layout-index/main-layout-index.component';
import { MainLayoutMenuComponent } from './main-layout-menu/main-layout-menu.component';
import { MainLayoutSidenavComponent } from './main-layout-sidenav/main-layout-sidenav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MainLayoutHeaderComponent, MainLayoutIndexComponent, MainLayoutMenuComponent, MainLayoutSidenavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MainLayoutMaterialModule
  ]
})
export class MainLayoutModule { }

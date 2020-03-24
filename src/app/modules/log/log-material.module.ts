import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  exports: [
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonToggleModule
  ]
})
export class LogMaterialModule { }

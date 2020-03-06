import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaMaterialModule } from './pwa-material.module';
import { PromptComponent } from './prompt/prompt.component';



@NgModule({
  declarations: [ PromptComponent],
  imports: [
    CommonModule,
    PwaMaterialModule
  ]
})
export class PwaModule { }

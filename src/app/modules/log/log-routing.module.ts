import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogIndexComponent } from './log-index/log-index.component';


const routes: Routes = [
  {
    path: '',
    // component:
    children: [
      {
        path: '',
        component: LogIndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }

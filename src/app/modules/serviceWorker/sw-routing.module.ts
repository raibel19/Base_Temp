import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwNotificationIndexComponent } from './sw-notification-index/sw-notification-index.component';


const routes: Routes = [
  {
    path: '',
    // component: ,
    children: [
      {
        path: '',
        component: SwNotificationIndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwRoutingModule { }

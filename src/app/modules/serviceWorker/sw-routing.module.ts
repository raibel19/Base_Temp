import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwNotificationIndexComponent } from './sw-notification-index/sw-notification-index.component';
import { MainLayoutIndexComponent } from 'src/app/layouts/main-layout-index/main-layout-index.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutIndexComponent,
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

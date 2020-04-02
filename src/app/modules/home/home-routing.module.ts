import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutIndexComponent } from 'src/app/layouts/main-layout-index/main-layout-index.component';
import { HomeIndexComponent } from './home-index/home-index.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutIndexComponent,
    children: [
      {
        path: '',
        component: HomeIndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

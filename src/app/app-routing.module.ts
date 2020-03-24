import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorIndexComponent } from './templates/error/error-index/error-index.component';


const routes: Routes = [
  {
    path: 'swnotification',
    loadChildren: () => import('./modules/serviceWorker/sw.module').then(mod => mod.SwModule)
  },
  {
    path: 'log',
    loadChildren: () => import('./modules/log/log.module').then(mod => mod.LogModule)
  },
  {
    path: 'error',
    component: ErrorIndexComponent
  },
  {
    path: '**',
    component: ErrorIndexComponent,
    data: { error: 404, url: '/' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

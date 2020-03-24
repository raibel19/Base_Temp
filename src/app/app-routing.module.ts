import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorIndexComponent } from './templates/error/error-index/error-index.component';
import { InternetConnectionService } from './services/internetConnection/internet-connection.service';


const routes: Routes = [
  {
    path: 'swnotification',
    loadChildren: () => import('./modules/serviceWorker/sw.module').then(mod => mod.SwModule),
    canActivate: [InternetConnectionService]
  },
  {
    path: 'log',
    loadChildren: () => import('./modules/log/log.module').then(mod => mod.LogModule),
    canActivate: [InternetConnectionService]
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

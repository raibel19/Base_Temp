import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorIndexComponent } from './templates/error/error-index/error-index.component';
import { InternetConnectionService } from './services/internetConnection/internet-connection.service';
import { MainLayoutIndexComponent } from './layouts/main-layout-index/main-layout-index.component';
import { HomeIndexComponent } from './modules/home/home-index/home-index.component';
import { MainLayoutModule } from './layouts/main-layout.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainLayoutIndexComponent,
    children: [
      {
        path: '',
        component: HomeIndexComponent,
      }
    ],
    // loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
    canActivate: [InternetConnectionService]
  },
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
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules
      }
    ),
    MainLayoutModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

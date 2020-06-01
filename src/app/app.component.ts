import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from './services/pwa/sw/notifications/notifications.service';
import { LoaderService } from './services/loader/loader.service';
import { InternetConnectionService } from './services/internetConnection/internet-connection.service';
import { MaterialIconService } from './services/materialIcon/material-icon.service';
import { ErrorsService } from './services/errors/errors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Base_Temp';

  constructor(
    private notificationsService: NotificationsService,
    private loaderService: LoaderService,
    private internetConnectionService: InternetConnectionService,
    private materialIconService: MaterialIconService,
    private errorService: ErrorsService
  ) {
    errorService.SubscribeNavigationError();
    notificationsService.init();
    loaderService.stupRouterLoader();
  }

  ngOnInit(): void {
    this.materialIconService.registerIcons();
  }

  ngOnDestroy(): void {
    this.loaderService.subscriptions.unsubscribe();
    this.notificationsService.subscriptions.unsubscribe();
    this.internetConnectionService.onDestroy();
    this.errorService.subscriptions.unsubscribe();
  }

  private preloadElements(): void {
    // const preloadLazyFontsElement = document.createElement('link');
    // preloadLazyFontsElement.rel = 'preload';
    // preloadLazyFontsElement.as = 'style';
    // preloadLazyFontsElement.href = 'lazy-fonts.css';
    // preloadLazyFontsElement.type = 'text/css';
    // preloadLazyFontsElement.media = '';
    // preloadLazyFontsElement.onload = () => {
    //   preloadLazyFontsElement.rel = 'stylesheet';
    //   if (preloadLazyFontsElement.media !== 'all') {
    //     preloadLazyFontsElement.media = 'all';
    //   }
    // };
    // document.head.appendChild(preloadLazyFontsElement);


    const preloadLazyStylesElement = document.createElement('link');
    preloadLazyStylesElement.rel = 'preload';
    preloadLazyStylesElement.as = 'style';
    preloadLazyStylesElement.href = 'lazy-styles.css';
    preloadLazyStylesElement.type = 'text/css';
    preloadLazyStylesElement.media = '';
    preloadLazyStylesElement.onload = () => {
      preloadLazyStylesElement.rel = 'stylesheet';
      if (preloadLazyStylesElement.media !== 'all') {
        preloadLazyStylesElement.media = 'all';
      }
    };
    document.head.appendChild(preloadLazyStylesElement);
  }
}

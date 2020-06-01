import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MENU_ROUTES } from 'src/app/shared/menu.shared';
import { SHARED_VARIABLES } from 'src/app/shared/variables.shared';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { NavModel } from 'src/app/shared/models/nav.model';
import { InternetConnectionService } from 'src/app/services/internetConnection/internet-connection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-layout-header',
  templateUrl: './main-layout-header.component.html',
  styleUrls: ['./main-layout-header.component.scss']
})
export class MainLayoutHeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter();
  private subscriptions: Subscription = new Subscription();
  public navList: Array<NavModel> = MENU_ROUTES.filter(n => n.showInHeader);
  public title: string = SHARED_VARIABLES.APP_TITLE;
  public xsBreakpoint: string = Breakpoints.XSmall;
  public notificationBadges = 20;
  public internetConnection = true;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute, // Usarlo para obtener el valor de parametros en la url
    private internetConnectionService: InternetConnectionService
  ) {
    this.subscriptions.add(
      this.internetConnectionService.statusInternetConection.subscribe(sb => {
        this.internetConnection = sb;
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public getMenuType(nav: NavModel): number {
    if (nav.useOnlyIcon) {
      return 1;
    } else if (!nav.children) {
      return 2;
    } else {
      return 3;
    }
  }

  private updateNotificationBadges() {
    this.notificationBadges++;
  }

  public isChildRouteActive(nav: NavModel) {
    const childrenPath = nav.children.map(m => m.path);
    return childrenPath.some(s => s === this.activatedRoute.snapshot['_routerState'].url);
  }
}

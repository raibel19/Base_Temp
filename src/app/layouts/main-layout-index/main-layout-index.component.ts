import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatDrawer } from '@angular/material/sidenav';
import { NavModel } from 'src/app/shared/models/nav.model';
import { MENU_ROUTES } from 'src/app/shared/menu.shared';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-layout-index',
  templateUrl: './main-layout-index.component.html',
  styleUrls: ['./main-layout-index.component.scss']
})
export class MainLayoutIndexComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('menu', { static: false }) menu: MatDrawer;

  private showMenuName = 'flagMenu';
  public navList: Array<NavModel> = MENU_ROUTES;
  public showMenu = false;
  public xsBreakpoint: string = Breakpoints.XSmall;

  constructor(
    public breakpointObserver: BreakpointObserver
  ) {
    const lsShowMenu = localStorage.getItem(this.showMenuName);
    this.showMenu = lsShowMenu ? lsShowMenu === 'true' : false;
  }

  ngOnInit(): void {
  }

  public sideNavToggle() {
    if (this.breakpointObserver.isMatched(this.xsBreakpoint)) {
      this.sidenav.toggle();
    } else {
      this.showMenu = !this.showMenu;
      localStorage.setItem(this.showMenuName, String(this.showMenu));
    }
  }

  public hideMenu() {
    this.showMenu = false;
    localStorage.setItem(this.showMenuName, String(this.showMenu));
  }

}

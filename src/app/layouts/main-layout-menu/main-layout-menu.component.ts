import { Component, OnInit, Input } from '@angular/core';
import { NavModel } from 'src/app/shared/models/nav.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-layout-menu',
  templateUrl: './main-layout-menu.component.html',
  styleUrls: ['./main-layout-menu.component.scss']
})
export class MainLayoutMenuComponent implements OnInit {
  @Input() navList: Array<NavModel>;
  @Input() showMenu: boolean;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  public isChildRouteActive(nav: NavModel) {
    const childrenPath = nav.children.map(m => m.path);
    return childrenPath.some(s => s === this.activatedRoute.snapshot['_routerState'].url);
  }

}

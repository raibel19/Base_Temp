import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NavModel } from 'src/app/shared/models/nav.model';

@Component({
  selector: 'app-main-layout-sidenav',
  templateUrl: './main-layout-sidenav.component.html',
  styleUrls: ['./main-layout-sidenav.component.scss']
})
export class MainLayoutSidenavComponent implements OnInit {
  @Input() navList: Array<NavModel>;
  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onSidenavClose() {
    this.sidenavClose.emit();
  }
}

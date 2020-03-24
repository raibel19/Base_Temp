import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-index',
  templateUrl: './error-index.component.html',
  styleUrls: ['./error-index.component.scss']
})
export class ErrorIndexComponent implements OnInit {
  public routeParams: any;
  public data: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeParams = this.activatedRoute.snapshot.queryParams;
    this.data = this.activatedRoute.snapshot.data;
  }
}

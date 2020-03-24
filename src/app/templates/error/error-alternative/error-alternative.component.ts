import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-alternative',
  templateUrl: './error-alternative.component.html',
  styleUrls: ['./error-alternative.component.scss']
})
export class ErrorAlternativeComponent implements OnInit {
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

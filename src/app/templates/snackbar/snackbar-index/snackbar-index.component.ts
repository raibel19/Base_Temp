import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-index',
  templateUrl: './snackbar-index.component.html',
  styleUrls: ['./snackbar-index.component.scss']
})
export class SnackbarIndexComponent implements OnInit {

  constructor(
    public snackBarRed: MatSnackBarRef<SnackbarIndexComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}

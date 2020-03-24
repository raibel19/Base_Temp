import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarIndexComponent } from './snackbar-index.component';

describe('SnackbarIndexComponent', () => {
  let component: SnackbarIndexComponent;
  let fixture: ComponentFixture<SnackbarIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

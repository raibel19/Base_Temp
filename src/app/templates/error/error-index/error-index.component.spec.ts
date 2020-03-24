import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorIndexComponent } from './error-index.component';

describe('ErrorIndexComponent', () => {
  let component: ErrorIndexComponent;
  let fixture: ComponentFixture<ErrorIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

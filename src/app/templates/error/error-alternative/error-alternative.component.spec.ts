import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAlternativeComponent } from './error-alternative.component';

describe('ErrorAlternativeComponent', () => {
  let component: ErrorAlternativeComponent;
  let fixture: ComponentFixture<ErrorAlternativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorAlternativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

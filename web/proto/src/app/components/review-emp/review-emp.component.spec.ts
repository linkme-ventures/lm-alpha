import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEmpComponent } from './review-emp.component';

describe('ReviewEmpComponent', () => {
  let component: ReviewEmpComponent;
  let fixture: ComponentFixture<ReviewEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

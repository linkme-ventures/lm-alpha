import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpJobComponent } from './emp-job.component';

describe('EmpJobComponent', () => {
  let component: EmpJobComponent;
  let fixture: ComponentFixture<EmpJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

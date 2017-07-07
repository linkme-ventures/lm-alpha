import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpFormComponent } from './add-emp-form.component';

describe('AddEmpFormComponent', () => {
  let component: AddEmpFormComponent;
  let fixture: ComponentFixture<AddEmpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

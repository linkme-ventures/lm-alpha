import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacancyComponent } from './add-vacancy.component';

describe('AddVacancyComponent', () => {
  let component: AddVacancyComponent;
  let fixture: ComponentFixture<AddVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

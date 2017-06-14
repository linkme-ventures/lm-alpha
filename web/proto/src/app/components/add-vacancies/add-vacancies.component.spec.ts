import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacanciesComponent } from './add-vacancies.component';

describe('AddVacanciesComponent', () => {
  let component: AddVacanciesComponent;
  let fixture: ComponentFixture<AddVacanciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVacanciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

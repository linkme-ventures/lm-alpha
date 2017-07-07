import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVacanciesComponent } from './manage-vacancies.component';

describe('ManageVacanciesComponent', () => {
  let component: ManageVacanciesComponent;
  let fixture: ComponentFixture<ManageVacanciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVacanciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

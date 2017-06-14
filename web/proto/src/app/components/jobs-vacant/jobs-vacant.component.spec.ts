import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsVacantComponent } from './jobs-vacant.component';

describe('JobsVacantComponent', () => {
  let component: JobsVacantComponent;
  let fixture: ComponentFixture<JobsVacantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsVacantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsVacantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

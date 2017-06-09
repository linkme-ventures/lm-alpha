import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPageComponent } from './job-page.component';

describe('JobPageComponent', () => {
  let component: JobPageComponent;
  let fixture: ComponentFixture<JobPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

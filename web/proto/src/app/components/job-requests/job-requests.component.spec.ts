import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRequestsComponent } from './job-requests.component';

describe('JobRequestsComponent', () => {
  let component: JobRequestsComponent;
  let fixture: ComponentFixture<JobRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

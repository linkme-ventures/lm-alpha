import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAddedListComponent } from './jobs-added-list.component';

describe('JobsAddedListComponent', () => {
  let component: JobsAddedListComponent;
  let fixture: ComponentFixture<JobsAddedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsAddedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsAddedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

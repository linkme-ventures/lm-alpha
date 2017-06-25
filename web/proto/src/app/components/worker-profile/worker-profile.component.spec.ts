import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerProfileComponent } from './worker-profile.component';

describe('WorkerProfileComponent', () => {
  let component: WorkerProfileComponent;
  let fixture: ComponentFixture<WorkerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

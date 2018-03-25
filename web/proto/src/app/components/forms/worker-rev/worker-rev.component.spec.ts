import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerRevComponent } from './worker-rev.component';

describe('WorkerRevComponent', () => {
  let component: WorkerRevComponent;
  let fixture: ComponentFixture<WorkerRevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerRevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

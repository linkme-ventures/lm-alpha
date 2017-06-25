import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedListComponent } from './accepted-list.component';

describe('AcceptedListComponent', () => {
  let component: AcceptedListComponent;
  let fixture: ComponentFixture<AcceptedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

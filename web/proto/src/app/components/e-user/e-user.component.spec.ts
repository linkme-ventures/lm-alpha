import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EUserComponent } from './e-user.component';

describe('EUserComponent', () => {
  let component: EUserComponent;
  let fixture: ComponentFixture<EUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

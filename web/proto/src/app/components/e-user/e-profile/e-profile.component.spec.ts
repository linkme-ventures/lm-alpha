import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EProfileComponent } from './e-profile.component';

describe('EProfileComponent', () => {
  let component: EProfileComponent;
  let fixture: ComponentFixture<EProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

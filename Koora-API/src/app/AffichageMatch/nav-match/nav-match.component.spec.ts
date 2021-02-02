import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMatchComponent } from './nav-match.component';

describe('NavMatchComponent', () => {
  let component: NavMatchComponent;
  let fixture: ComponentFixture<NavMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

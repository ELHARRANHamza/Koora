import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointTeamsComponent } from './point-teams.component';

describe('PointTeamsComponent', () => {
  let component: PointTeamsComponent;
  let fixture: ComponentFixture<PointTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageTeamsComponent } from './affichage-teams.component';

describe('AffichageTeamsComponent', () => {
  let component: AffichageTeamsComponent;
  let fixture: ComponentFixture<AffichageTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichageTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

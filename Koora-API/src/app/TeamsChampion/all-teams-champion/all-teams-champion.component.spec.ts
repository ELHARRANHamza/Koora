import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamsChampionComponent } from './all-teams-champion.component';

describe('AllTeamsChampionComponent', () => {
  let component: AllTeamsChampionComponent;
  let fixture: ComponentFixture<AllTeamsChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTeamsChampionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeamsChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

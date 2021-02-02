import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsChampionComponent } from './teams-champion.component';

describe('TeamsChampionComponent', () => {
  let component: TeamsChampionComponent;
  let fixture: ComponentFixture<TeamsChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsChampionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

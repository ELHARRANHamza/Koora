import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchChampionComponent } from './match-champion.component';

describe('MatchChampionComponent', () => {
  let component: MatchChampionComponent;
  let fixture: ComponentFixture<MatchChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchChampionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

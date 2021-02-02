import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamsChampionComponent } from './add-teams-champion.component';

describe('AddTeamsChampionComponent', () => {
  let component: AddTeamsChampionComponent;
  let fixture: ComponentFixture<AddTeamsChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamsChampionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamsChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

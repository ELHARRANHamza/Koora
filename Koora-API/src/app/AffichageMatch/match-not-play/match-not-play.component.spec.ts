import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchNotPlayComponent } from './match-not-play.component';

describe('MatchNotPlayComponent', () => {
  let component: MatchNotPlayComponent;
  let fixture: ComponentFixture<MatchNotPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchNotPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchNotPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

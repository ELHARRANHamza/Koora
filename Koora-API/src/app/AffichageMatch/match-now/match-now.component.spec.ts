import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchNowComponent } from './match-now.component';

describe('MatchNowComponent', () => {
  let component: MatchNowComponent;
  let fixture: ComponentFixture<MatchNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

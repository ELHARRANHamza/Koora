import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePlayersComponent } from './more-players.component';

describe('MorePlayersComponent', () => {
  let component: MorePlayersComponent;
  let fixture: ComponentFixture<MorePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorePlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MorePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

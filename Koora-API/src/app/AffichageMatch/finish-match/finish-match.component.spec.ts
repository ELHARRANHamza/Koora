import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishMatchComponent } from './finish-match.component';

describe('FinishMatchComponent', () => {
  let component: FinishMatchComponent;
  let fixture: ComponentFixture<FinishMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatchTvComponent } from './add-match-tv.component';

describe('AddMatchTvComponent', () => {
  let component: AddMatchTvComponent;
  let fixture: ComponentFixture<AddMatchTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatchTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatchTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

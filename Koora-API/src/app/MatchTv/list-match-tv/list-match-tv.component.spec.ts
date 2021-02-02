import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatchTvComponent } from './list-match-tv.component';

describe('ListMatchTvComponent', () => {
  let component: ListMatchTvComponent;
  let fixture: ComponentFixture<ListMatchTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMatchTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMatchTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

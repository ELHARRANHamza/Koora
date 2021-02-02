import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContryComponent } from './list-contry.component';

describe('ListContryComponent', () => {
  let component: ListContryComponent;
  let fixture: ComponentFixture<ListContryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

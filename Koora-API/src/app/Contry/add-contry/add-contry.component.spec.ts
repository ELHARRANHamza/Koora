import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContryComponent } from './add-contry.component';

describe('AddContryComponent', () => {
  let component: AddContryComponent;
  let fixture: ComponentFixture<AddContryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

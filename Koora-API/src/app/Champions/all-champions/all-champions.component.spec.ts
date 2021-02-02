import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChampionsComponent } from './all-champions.component';

describe('AllChampionsComponent', () => {
  let component: AllChampionsComponent;
  let fixture: ComponentFixture<AllChampionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllChampionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllChampionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

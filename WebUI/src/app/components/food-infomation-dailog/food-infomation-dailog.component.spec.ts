import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInfomationDailogComponent } from './food-infomation-dailog.component';

describe('FoodInfomationDailogComponent', () => {
  let component: FoodInfomationDailogComponent;
  let fixture: ComponentFixture<FoodInfomationDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodInfomationDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodInfomationDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

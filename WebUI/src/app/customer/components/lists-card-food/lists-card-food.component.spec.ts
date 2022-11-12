import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsCardFoodComponent } from './lists-card-food.component';

describe('ListsCardFoodComponent', () => {
  let component: ListsCardFoodComponent;
  let fixture: ComponentFixture<ListsCardFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsCardFoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsCardFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

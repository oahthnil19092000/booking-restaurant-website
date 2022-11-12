import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderForTableComponent } from './order-for-table.component';

describe('OrderForTableComponent', () => {
  let component: OrderForTableComponent;
  let fixture: ComponentFixture<OrderForTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderForTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderForTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

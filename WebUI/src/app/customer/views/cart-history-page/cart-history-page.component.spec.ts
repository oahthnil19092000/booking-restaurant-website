import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartHistoryPageComponent } from './cart-history-page.component';

describe('CartHistoryPageComponent', () => {
  let component: CartHistoryPageComponent;
  let fixture: ComponentFixture<CartHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartHistoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveHistoryPageComponent } from './reserve-history-page.component';

describe('ReserveHistoryPageComponent', () => {
  let component: ReserveHistoryPageComponent;
  let fixture: ComponentFixture<ReserveHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveHistoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

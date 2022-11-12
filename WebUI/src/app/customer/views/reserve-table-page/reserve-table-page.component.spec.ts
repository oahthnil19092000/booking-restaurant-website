import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTablePageComponent } from './reserve-table-page.component';

describe('ReserveTablePageComponent', () => {
  let component: ReserveTablePageComponent;
  let fixture: ComponentFixture<ReserveTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveTablePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

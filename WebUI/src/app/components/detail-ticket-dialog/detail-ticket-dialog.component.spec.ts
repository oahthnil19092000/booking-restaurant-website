import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTicketDialogComponent } from './detail-ticket-dialog.component';

describe('DetailTicketDialogComponent', () => {
  let component: DetailTicketDialogComponent;
  let fixture: ComponentFixture<DetailTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTicketDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

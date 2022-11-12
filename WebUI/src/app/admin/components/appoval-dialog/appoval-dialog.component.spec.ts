import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppovalDialogComponent } from './appoval-dialog.component';

describe('AppovalDialogComponent', () => {
  let component: AppovalDialogComponent;
  let fixture: ComponentFixture<AppovalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppovalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

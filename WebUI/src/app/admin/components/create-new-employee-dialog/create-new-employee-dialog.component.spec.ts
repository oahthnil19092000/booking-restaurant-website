import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewEmployeeDialogComponent } from './create-new-employee-dialog.component';

describe('CreateNewEmployeeDialogComponent', () => {
  let component: CreateNewEmployeeDialogComponent;
  let fixture: ComponentFixture<CreateNewEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewEmployeeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

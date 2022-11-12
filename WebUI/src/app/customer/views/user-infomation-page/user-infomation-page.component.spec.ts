import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfomationPageComponent } from './user-infomation-page.component';

describe('UserInfomationPageComponent', () => {
  let component: UserInfomationPageComponent;
  let fixture: ComponentFixture<UserInfomationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfomationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfomationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

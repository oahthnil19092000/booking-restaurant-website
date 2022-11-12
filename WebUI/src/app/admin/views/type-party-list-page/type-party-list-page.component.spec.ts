import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePartyListPageComponent } from './type-party-list-page.component';

describe('TypePartyListPageComponent', () => {
  let component: TypePartyListPageComponent;
  let fixture: ComponentFixture<TypePartyListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePartyListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypePartyListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

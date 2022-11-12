import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversedListPageComponent } from './reversed-list-page.component';

describe('ReversedListPageComponent', () => {
  let component: ReversedListPageComponent;
  let fixture: ComponentFixture<ReversedListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReversedListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReversedListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

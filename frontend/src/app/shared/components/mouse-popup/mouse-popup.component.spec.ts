import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePopupComponent } from './mouse-popup.component';

describe('MousePopupComponent', () => {
  let component: MousePopupComponent;
  let fixture: ComponentFixture<MousePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MousePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MousePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

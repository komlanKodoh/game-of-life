import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpendComponent } from './expend.component';

describe('ExpendComponent', () => {
  let component: ExpendComponent;
  let fixture: ComponentFixture<ExpendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

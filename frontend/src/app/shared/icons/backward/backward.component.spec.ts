import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardComponent } from './backward.component';

describe('BackwardComponent', () => {
  let component: BackwardComponent;
  let fixture: ComponentFixture<BackwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

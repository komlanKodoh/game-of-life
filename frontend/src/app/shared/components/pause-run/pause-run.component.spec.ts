import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseRunComponent } from './pause-run.component';

describe('PauseRunComponent', () => {
  let component: PauseRunComponent;
  let fixture: ComponentFixture<PauseRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PauseRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

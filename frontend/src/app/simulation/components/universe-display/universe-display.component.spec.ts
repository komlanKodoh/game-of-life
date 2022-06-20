import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseDisplayComponent } from './universe-display.component';

describe('UniverseDisplayComponent', () => {
  let component: UniverseDisplayComponent;
  let fixture: ComponentFixture<UniverseDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniverseDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniverseDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

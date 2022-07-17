import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationBrushConfigComponent } from './simulation-brush-config.component';

describe('SimulationBrushConfigComponent', () => {
  let component: SimulationBrushConfigComponent;
  let fixture: ComponentFixture<SimulationBrushConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulationBrushConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationBrushConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransversalGridComponent } from './transversal-grid.component';

describe('TransversalGridComponent', () => {
  let component: TransversalGridComponent;
  let fixture: ComponentFixture<TransversalGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransversalGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransversalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

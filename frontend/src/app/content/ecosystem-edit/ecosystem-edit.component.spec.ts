import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosystemEditComponent } from './ecosystem-edit.component';

describe('EcosystemEditComponent', () => {
  let component: EcosystemEditComponent;
  let fixture: ComponentFixture<EcosystemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcosystemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcosystemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

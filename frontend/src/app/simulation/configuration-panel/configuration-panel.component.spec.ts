import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationPanelComponent } from './configuration-panel.component';

describe('ConfigurationPanelComponent', () => {
  let component: ConfigurationPanelComponent;
  let fixture: ComponentFixture<ConfigurationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

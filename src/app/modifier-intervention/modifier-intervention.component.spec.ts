import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierInterventionComponent } from './modifier-intervention.component';

describe('ModifierInterventionComponent', () => {
  let component: ModifierInterventionComponent;
  let fixture: ComponentFixture<ModifierInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

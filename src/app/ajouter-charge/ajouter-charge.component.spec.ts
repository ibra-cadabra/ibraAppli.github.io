import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AjouterChargeComponent} from './ajouter-charge.component';

describe('AjouterChargeComponent', () => {
  let component: AjouterChargeComponent;
  let fixture: ComponentFixture<AjouterChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterChargeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

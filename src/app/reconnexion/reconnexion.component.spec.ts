import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReconnexionComponent} from './reconnexion.component';

describe('ReconnexionComponent', () => {
  let component: ReconnexionComponent;
  let fixture: ComponentFixture<ReconnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReconnexionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

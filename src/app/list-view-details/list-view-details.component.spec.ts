import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewDetailsComponent } from './list-view-details.component';

describe('ListViewDetailsComponent', () => {
  let component: ListViewDetailsComponent;
  let fixture: ComponentFixture<ListViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

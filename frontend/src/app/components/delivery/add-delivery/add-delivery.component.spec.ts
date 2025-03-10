import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryComponent } from './add-delivery.component';

describe('AddDeliveryComponent', () => {
  let component: AddDeliveryComponent;
  let fixture: ComponentFixture<AddDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeliveryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

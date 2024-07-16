import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { PackageFormComponent } from '../../package/package-form/package-form.component';
import { DeliveryFormComponent } from '../delivery-form/delivery-form.component';

@Component({
  selector: 'app-add-delivery',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MatIconModule,
    MatCardModule,
    DeliveryFormComponent
  ],
  templateUrl: './add-delivery.component.html',
  styleUrl: './add-delivery.component.css'
})
export class AddDeliveryComponent {
  title= 'Create Package';
}

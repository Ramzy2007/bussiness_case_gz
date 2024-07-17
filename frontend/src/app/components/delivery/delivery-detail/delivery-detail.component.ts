import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Delivery } from '../../../interfaces/delivery';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-delivery-detail',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './delivery-detail.component.html',
  styleUrl: './delivery-detail.component.css',
})
export class DeliveryDetailComponent {
  @Input() delivery!: Delivery;

  getStatusClass(status: string): string {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'picked-up':
        return 'status-picked-up';
      case 'in-transit':
        return 'status-in-transit';
      case 'delivered':
        return 'status-delivered';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  }
}

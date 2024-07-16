import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from '../../../services/delivery/delivery.service';
import { ApiResponse } from '../../../interfaces/others';
import { CommonModule } from '@angular/common';
import { Delivery } from '../../../interfaces/delivery';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-delivery-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,],
  templateUrl: './delivery-detail.component.html',
  styleUrl: './delivery-detail.component.css'
})
export class DeliveryDetailComponent implements OnInit {
  @Input() delivery!: Delivery;

  constructor() {}

  ngOnInit(): void {
  
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { PackageListComponent } from '../../components/package/package-list/package-list.component';
import { MatIconModule } from '@angular/material/icon';
import { DeliveryListComponent } from '../../components/delivery/delivery-list/delivery-list.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    PackageListComponent,
    DeliveryListComponent,
    ButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
  constructor( private router: Router) {}

   title = 'Web Admin';

  navigateToCreatePackage() {
    this.router.navigate(['/admin-management/create-package']);
  }

  navigateToCreateDelivery() {
    this.router.navigate(['/admin-management/create-delivery']);
  }

}

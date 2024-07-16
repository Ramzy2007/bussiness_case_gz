import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { PackageListComponent } from '../../components/package/package-list/package-list.component';
import { EditPopupComponent } from '../../components/edit-popup/edit-popup.component';
import { MatIconModule } from '@angular/material/icon';
import { DeliveryListComponent } from '../../components/delivery/delivery-list/delivery-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PackageFormComponent } from '../../components/package/package-form/package-form.component';
import { DeliveryFormComponent } from '../../components/delivery/delivery-form/delivery-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    PackageListComponent,
    DeliveryListComponent,
    EditPopupComponent,
    ButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent{
  constructor(private dialog: MatDialog) {}

   title = 'Web Admin';

  openAddPackageDialog() {
    this.dialog.open(PackageFormComponent, {
      width: '80%', // Ajuste la largeur selon tes besoins
    });
  }

  openAddDeliveryDialog() {
    this.dialog.open(DeliveryFormComponent, {
      width: '80%', // Ajuste la largeur selon tes besoins
    });
  }

  ngOnInit() {
    
  }
}

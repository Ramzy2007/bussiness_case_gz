import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LeafletMapComponent } from '../components/leaflet-map/leaflet-map.component';
import { PackageDetailComponent } from '../components/package/package-detail/package-detail.component';
import { DeliveryDetailComponent } from '../components/delivery/delivery-detail/delivery-detail.component';
import { PackageService } from '../services/package/package.service';
import { ApiResponse } from '../interfaces/others';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Package } from '../interfaces/package';
import { Delivery } from '../interfaces/delivery';
import { DeliveryService } from '../services/delivery/delivery.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [
    MatCardModule,
    PackageDetailComponent,
    DeliveryDetailComponent,
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule, 
    FormsModule, 
    MatIconModule,
    CommonModule
  ],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent {
  title = 'Web Driver';
  package!: Package;
  delivery!: Delivery;

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService
  ) {}

  searchId = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  onSearch() {
    if (this.searchId.valid) {
      this.packageService.getPackage(`http://localhost:3000/api/package/${this.searchId.value}`)
      .subscribe({
        next: (data: ApiResponse) => {
          this.package = data.data as Package;
          if (this.package.active_delivery_id !== null) {
            this.getDelivery(this.package.active_delivery_id as string);
          }
        },
        error: (error) => {
          console.error('Error fetching package:', error);
        }
      });
    }
  }

  getDelivery(id: string) {
    this.deliveryService.getDelivery(`http://localhost:3000/api/delivery/${id}`)
      .subscribe({
        next: (data: ApiResponse) => {
          this.delivery = data.data as Delivery;
        },
        error: (error: any) => {
          console.error('Error fetching delivery:', error);
        }
      });
  }
}

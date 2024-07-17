import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PackageDetailComponent } from '../../components/package/package-detail/package-detail.component';
import { DeliveryDetailComponent } from '../../components/delivery/delivery-detail/delivery-detail.component';
import { PackageService } from '../../services/package/package.service';
import { ApiResponse } from '../../interfaces/others';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Location, Package } from '../../interfaces/package';
import { Delivery } from '../../interfaces/delivery';
import { DeliveryService } from '../../services/delivery/delivery.service';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';
import { WebsocketService } from '../../services/websocket/websocket.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [
    MatCardModule,
    PackageDetailComponent,
    DeliveryDetailComponent,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    GoogleMapsComponent,
    CommonModule,
  ],
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'], // Corrected typo here
})
export class TrackerComponent implements OnInit {
  title = 'Web Tracker';
  package!: Package;
  delivery!: Delivery;
  locationFrom!: Location;
  locationTo!: Location;
  location: Location = { lat: 0, lng: 0 };

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService,
    private websocketService: WebsocketService,
  ) {}

  searchId = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    //this.websocketService.openWebSocket();
    this.websocketService.getStatusUpdates().subscribe((data: any) => {
      this.delivery = data;
    });
  }

  onSearch() {
    if (this.searchId.valid) {
      this.packageService
        .getPackage(`http://localhost:3000/api/package/${this.searchId.value}`)
        .subscribe({
          next: (data: ApiResponse) => {
            this.package = data.data as Package;
            this.locationFrom = this.package.from_location;
            this.locationTo = this.package.to_location;
            if (this.package.active_delivery_id !== null) {
              this.getDelivery(this.package.active_delivery_id as string);
            }
          },
          error: (error) => {
            console.error('Error fetching package:', error);
          },
        });
    }
  }

  getDelivery(id: string) {
    this.deliveryService
      .getDelivery(`http://localhost:3000/api/delivery/${id}`)
      .subscribe({
        next: (data: ApiResponse) => {
          this.delivery = data.data as Delivery;
          this.location = this.delivery.location;
        },
        error: (error: any) => {
          console.error('Error fetching delivery:', error);
        },
      });
  }
}

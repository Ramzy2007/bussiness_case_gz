import { Component, OnInit, signal } from '@angular/core';
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
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component';
import { WebsocketService } from '../services/websocket/websocket.service';
import { LocationService } from '../services/location/location.service';

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
    GoogleMapsComponent,
    CommonModule
  ],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {
  title = 'Web Driver';
  package!: Package;
  delivery!: Delivery;
  currentStatus!: string;
  private locationInterval: any;


  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService,
    private websocketService: WebsocketService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    //this.websocketService.openWebSocket();
    this.websocketService.getStatusUpdates().subscribe((data: any) => {
      this.delivery = data;
      this.currentStatus = data.status;
    });

    this.getLocation();
   
  }

  searchId = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  getLocation(){
    this.locationInterval = setInterval(() => {
      this.locationService.getLocation().then(position => {
        const locationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.websocketService.sendLocation(
          {
            event: 'location_changed', 
            delivery_id: this.delivery._id as string, 
            location: locationData 
          });
      }).catch(error => {
        console.error('Error getting location: ', error);
      });
    }, 20000);
  }

  onSearch() {
    if (this.searchId.valid) {
      this.deliveryService.getDelivery(`http://localhost:3000/api/delivery/${this.searchId.value}`)
      .subscribe({
        next: (data: ApiResponse) => {
          this.delivery = data.data as Delivery;
          this.currentStatus= this.delivery.status;

          if (this.delivery.package !="") {
            this.getPackage(this.delivery.package as string);
          }
        },
        error: (error: any) => {
          console.error('Error fetching delivery:', error);
        }
      });
    }
  }

  getPackage(id: string) {

    this.packageService.getPackage(`http://localhost:3000/api/package/${id}`)
      .subscribe({
        next: (data: ApiResponse) => {
          this.package = data.data as Package;
        },
        error: (error) => {
          console.error('Error fetching package:', error);
        }
      });
  }

  changeStatus(newStatus: string): void {
    this.websocketService.sendStatus(
      { 
        event: 'status_changed', 
        delivery_id: this.delivery._id as string, 
        status: newStatus 
      }); // Use the new method
  }

  ngOnDestroy(): void {
    if (this.locationInterval) {
      clearInterval(this.locationInterval);
    }
  }
}

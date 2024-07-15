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

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    //this.websocketService.openWebSocket();
   
  }

  searchId = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  onSearch() {
    if (this.searchId.valid) {
      this.deliveryService.getDelivery(`http://localhost:3000/api/delivery/${this.searchId.value}`)
      .subscribe({
        next: (data: ApiResponse) => {
          this.delivery = data.data as Delivery;
          this.currentStatus= this.delivery.status;

          console.log('482858586365565655555555555555885858888855555555555');
          console.log(this.delivery.package);
            console.log('##########  End ############');
          if(typeof this.delivery !== 'undefined'){
          this.websocketService.getStatusUpdates().subscribe((status: string) => {
            console.log('##########  getStatus ############');
            this.currentStatus = status;
            console.log('##########  End ############');
          });
          console.log('##########  2252525252525 ############');
            this.currentStatus = status;
            console.log('##########  End ############');
        }

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
    console.log('##########  ggggggggg ############');
    this.websocketService.sendStatus({ deliveryId: this.delivery.id_, status: newStatus }); // Use the new method
    console.log('########## 5 ggggggggg ############');
  }
}

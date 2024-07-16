import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { PackageService } from '../../../services/package/package.service';
import { Package } from '../../../interfaces/package';
import { ApiResponse } from '../../../interfaces/others';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Delivery } from '../../../interfaces/delivery';
import { DeliveryService } from '../../../services/delivery/delivery.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule, 
    FormsModule, 
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './delivery-form.component.html',
  styleUrl: './delivery-form.component.css'
})
export class DeliveryFormComponent implements OnInit {
  isEdit: boolean = false;
  deliveryId!: string;
  packages!: Package[];
  title= 'Create Delivery';

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService,
  ) {
    this.fetchPackages();
  }

  delivery: Delivery = {
    //start_time: '',
    //end_time: '',
    //status: '',
    //pickup_time: '',
    location: { lat: 0, lng: 0 },
    package: '',
  };

  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
  }

  fetchPackages(page?: number, perPage?: number) {
    this.packageService
      .getPackages('http://localhost:3000/api/package')
      .subscribe({
        next: (data: ApiResponse) => {
          this.packages = data.data as Package[];
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEdit) {
        this.deliveryService
        .editDelivery(this.deliveryId, this.delivery)
        .subscribe({
          next: (data: ApiResponse) => {
            console.log('Form submitted successfully!', this.delivery);
          this.successMessage = 'The delivery has been upgrade successfully!';
          this.errorMessage = ''; // Reset the error message
          this.delivery = data.data as Delivery;
          },
          error: (error: { data: { message: string; }; }) => {
            console.log(error);
            this.errorMessage = 'Please correct the errors in the form.<br> ERROR:'+error.data.message;
            this.successMessage = '';
          }
        });
      } else {
      this.deliveryService
        .addDelivery('http://localhost:3000/api/delivery',this.delivery)
        .subscribe({
          next: (data: ApiResponse) => {
            console.log('Form submitted successfully!', this.delivery);
          this.successMessage = 'The delivery has been created successfully!';
          this.errorMessage = ''; // Reset the error message
          this.delivery = data.data as Delivery;
          form.reset();
          },
          error: (error: { data: { message: string; }; }) => {
            console.log(error);
            this.errorMessage = 'Please correct the errors in the form.<br> ERROR:'+error.data.message;
            this.successMessage = '';
          }
        });
    }
  }
  }
}

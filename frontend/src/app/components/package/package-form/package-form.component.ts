import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { PackageService } from '../../../services/package/package.service';
import { Package } from '../../../interfaces/package';
import { ApiResponse } from '../../../interfaces/others';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-package-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule, 
    FormsModule, 
    MatIconModule
  ],
  templateUrl: './package-form.component.html',
  styleUrl: './package-form.component.css',
})
export class PackageFormComponent {
  isEdit = false;
  packageId!: string;
  title= 'Create Package';

  constructor(
    private packageService: PackageService,
  ) {}

  package: Package = {
    description: '',
    weight: 0,
    width: 0,
    height: 0,
    depth: 0,
    from_name: '',
    from_address: '',
    to_name: '',
    to_address: '',
    from_location: { lat: 0, lng: 0 },
    to_location: { lat: 0, lng: 0 },
  };

  successMessage = '';
  errorMessage = '';

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEdit) {
        this.packageService
        .editPackage(this.packageId, this.package)
        .subscribe({
          next: (data: ApiResponse) => {
            console.log('Form submitted successfully!', this.package);
          this.successMessage = 'The package has been upgrade successfully!';
          this.errorMessage = ''; // Reset the error message
          this.package = data.data as Package;
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = 'Please correct the errors in the form.<br> ERROR:'+error.data.message;
            this.successMessage = '';
          }
        });
      } else {
      this.packageService
        .addPackage('http://localhost:3000/api/package',this.package)
        .subscribe({
          next: (data: ApiResponse) => {
            console.log('Form submitted successfully!', this.package);
          this.successMessage = 'The package has been created successfully!';
          this.errorMessage = ''; // Reset the error message
          this.package = data.data as Package;
          form.reset();
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = 'Please correct the errors in the form.<br> ERROR:'+error.data.message;
            this.successMessage = '';
          }
        });
    }
  }
  }
}

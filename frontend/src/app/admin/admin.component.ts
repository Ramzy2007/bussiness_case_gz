import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PackageService } from '../services/package.service';
import { ApiResponse, Package } from '../types';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { PackageListComponent } from '../components/package-list/package-list.component';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    //MatCardModule,
    //RouterModule,
    CommonModule,
    PaginatorModule,
    PackageListComponent,
    EditPopupComponent,
    ButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent{
  constructor(private packageService: PackageService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  packages: Package[] = [];

   title = 'Admin';

  totalRecords: number = 0;
  rows: number = 12;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(packag: any) {
    this.selectedPackage = packag;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(packag: any) {
    if (!packag.id_) {
      return;
    }

    this.deletePackage(packag.id_);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedPackage: Package = {
    id_: "",
    description: "",
  weight: 0,
  width: 0,
  height: 0,
  depth: 0,
  from_name: "",
  from_address: "",
  to_name: "",
  to_address: "",
  from_location: {
    lat: 0,
    lng: 0
},
  to_location: {
    lat: 0,
    lng: 0
},
  createdAt: "",
  updatedAt: ""
  };

  onConfirmEdit(packag: Package) {
    if (!this.selectedPackage.id_) {
      return;
    }

    this.editPackage(packag, this.selectedPackage.id_);
    this.displayEditPopup = false;
  }

  onConfirmAdd(packag: any) {
    this.addPackage(packag);
    this.displayAddPopup = false;
  }

  onProductOutput(packag: Package) {
    console.log(packag, 'Output');
  }

  onPageChange(event: any) {
    this.fetchPackages(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchPackages(page?: number, perPage?: number) {
    this.packageService
      .getPackages('http://localhost:3000/api/package')
      .subscribe({
        next: (data: ApiResponse) => {
          this.packages = data.data as Package[];
          this.totalRecords = this.packages.length;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editPackage(packag: Package, id: string) {
    this.packageService
      .editPackage(`http://localhost:3000/api/package/${id}`, packag)
      .subscribe({
        next: (data: ApiResponse) => {
          console.log(data);
          this.fetchPackages(0, this.rows);
          this.resetPaginator();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  deletePackage(id: string) {
    this.packageService
      .deletePackage(`http://localhost:3000/api/package/${id}`)
      .subscribe({
        next: (data: ApiResponse) => {
          console.log(data);
          this.fetchPackages(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addPackage(packag: Package) {
    this.packageService
      .addPackage(`http://localhost:3000/api/package`, packag)
      .subscribe({
        next: (data: ApiResponse) => {
          console.log(data);
          this.fetchPackages(0, this.rows);
          this.resetPaginator();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchPackages();
  }
}

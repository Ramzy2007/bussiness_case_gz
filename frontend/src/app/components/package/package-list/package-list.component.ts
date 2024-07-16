import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Package } from '../../../interfaces/package';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { PackageService } from '../../../services/package/package.service';
import { ApiResponse } from '../../../interfaces/others';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [
    ButtonModule,
    MatTableModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css'],
})
export class PackageListComponent implements AfterViewInit, OnInit {
  packages: Package[] = [];
  title = 'Package list';
  totalRecords: number = 0;
  rows: number = 12;

  router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() delete: EventEmitter<Package> = new EventEmitter<Package>();

  displayedColumns: string[] = [
    'id',
    'from_name',
    'from_address',
    'to_name',
    'to_address',
    'dimension',
    'from_location',
    'to_location',
    // 'description',
    'createdAt',
    // 'updatedAt'
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private packageService: PackageService,
  ) {
    this.fetchPackages();
  }

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/package/' + id);
  }

  fetchPackages(page?: number, perPage?: number) {
    this.packageService
      .getPackages('http://localhost:3000/api/package')
      .subscribe({
        next: (data: ApiResponse) => {
          this.dataSource.data = data.data as Package[];
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  copyToClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textarea);
  }

  ngOnInit() {
    // Initialization logic if needed
  }
}

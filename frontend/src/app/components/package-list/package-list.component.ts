import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { ApiResponse, Package } from '../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    MatTableModule,
    ButtonModule,
    RouterLink,
    MatPaginatorModule,
    TruncateNamePipe,
    MatFormFieldModule,
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

  @ViewChild('deleteButton') deleteButton: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() packageList!: Package[];
  @Output() delete: EventEmitter<Package> = new EventEmitter<Package>();

  displayedColumns: string[] = [
    'id_',
    'width',
    'height',
    'depth',
    'from_name',
    'from_address',
    'to_name',
    'to_address',
    'from_location',
    'to_location',
    'description',
    'createdAt',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private packageService: PackageService,
    private confirmationService: ConfirmationService
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
          this.packageList = data.data as Package[];
          this.dataSource.data = this.packageList;
          this.totalRecords = this.packageList.length;
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

  ngOnInit() {
    // Initialization logic if needed
  }
}

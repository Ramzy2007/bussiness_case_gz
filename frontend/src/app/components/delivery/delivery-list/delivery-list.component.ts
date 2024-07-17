import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
  AfterViewInit,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { Delivery } from '../../../interfaces/delivery';
import { DeliveryService } from '../../../services/delivery/delivery.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [
    ButtonModule,
    MatTableModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    CommonModule,
    MatIconModule
  ],
  providers: [ConfirmationService],
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css'],
})
export class DeliveryListComponent implements AfterViewInit {
  packages: Delivery[] = [];
  title = 'Delivery list';

  router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() delete: EventEmitter<Delivery> = new EventEmitter<Delivery>();

  displayedColumns: string[] = [
    'id',
    'status',
    'start_time',
    'pickup_time',
    'end_time',
    'location',
    // 'package',
    // 'updatedAt',
    'createdAt',
  ];

  dataSource = new MatTableDataSource<Delivery>();

  constructor(private deliveryService: DeliveryService) {
    this.fetchDeliveries();
  }

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/delivery/' + id);
  }

  fetchDeliveries() {
    this.deliveryService
      .getDeliveries('http://localhost:3000/api/delivery')
      .subscribe({
        next: (data) => {
          this.dataSource.data = data.data as Delivery[];
        },
        error: (error: any) => {
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'picked-up':
        return 'status-picked-up';
      case 'in-transit':
        return 'status-in-transit';
      case 'delivered':
        return 'status-delivered';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  }
}

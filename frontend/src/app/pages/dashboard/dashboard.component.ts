import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  title = 'Business Case';
  items = [
    {
      title: 'ADMIN',
      link: 'admin-management',
      img: 'assets/images/admin.png',
    },
    {
      title: 'CUSTOMER',
      link: 'tracker-management',
      img: 'assets/images/tracker.png',
    },
    {
      title: 'DRIVER',
      link: 'driver-management',
      img: 'assets/images/driver.png',
    },
  ];
}

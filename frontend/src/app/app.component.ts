import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    RouterModule, 
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Business Case';
  items = [
    { title: 'ADMIN', link: 'admin-management', img: 'assets/images/admin.png' },
    { title: 'CUSTOMER', link: 'tracker-management', img: 'assets/images/tracker.png' },
    { title: 'DRIVER', link: 'driver-management', img: 'assets/images/driver.png' }
  ];
}

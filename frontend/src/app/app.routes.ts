import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { DriverComponent } from './driver/driver.component';
import { TrackerComponent } from './tracker/tracker.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-management', component: AdminComponent },
  { path: 'driver-management', component: DriverComponent },
  { path: 'tracker-management', component: TrackerComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

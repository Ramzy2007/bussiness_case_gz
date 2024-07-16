import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { DriverComponent } from './pages/driver/driver.component';
import { TrackerComponent } from './pages/tracker/tracker.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-management', component: AdminComponent },
  { path: 'driver-management', component: DriverComponent },
  { path: 'tracker-management', component: TrackerComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

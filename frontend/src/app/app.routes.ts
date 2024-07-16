import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { DriverComponent } from './pages/driver/driver.component';
import { TrackerComponent } from './pages/tracker/tracker.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddPackageComponent } from './components/package/add-package/add-package.component';
import { AddDeliveryComponent } from './components/delivery/add-delivery/add-delivery.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-management', component: AdminComponent },
  { path: 'driver-management', component: DriverComponent },
  { path: 'tracker-management', component: TrackerComponent },
  { path: 'admin-management/create-package', component: AddPackageComponent },
  { path: 'admin-management/create-delivery', component: AddDeliveryComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

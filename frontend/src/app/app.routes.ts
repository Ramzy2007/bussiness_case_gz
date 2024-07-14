import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DriverComponent } from './driver/driver.component';
import { TrackerComponent } from './tracker/tracker.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-management', component: AdminComponent },
  { path: 'driver-management', component: DriverComponent },
  { path: 'tracker-management', component: TrackerComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'admin-management', loadChildren: () => import('./admin/admin.routes') },
//   {
//     path:'admin-management',
//     component: AdminComponent,
//     children: [
        
//         {
//             path:'admin-management1',
//             component: AdminComponent
//         },
//         {
//             path:'tracker-management',
//             component: TrackerComponent
//         },
//     ]
// }
];

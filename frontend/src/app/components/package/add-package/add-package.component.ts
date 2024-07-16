import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { PackageFormComponent } from '../package-form/package-form.component';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MatIconModule,
    MatCardModule,
    PackageFormComponent
  ],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  title= 'Create Package';
}

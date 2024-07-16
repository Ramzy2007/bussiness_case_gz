import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Package } from '../../../interfaces/package';
import {MatDividerModule} from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './package-detail.component.html',
  styleUrl: './package-detail.component.css',
})
export class PackageDetailComponent {
  @Input() package!: Package;

}

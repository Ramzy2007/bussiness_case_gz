import { Component, Input, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package/package.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../../interfaces/others';
import { CommonModule } from '@angular/common';
import { Package } from '../../../interfaces/package';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider'

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule,MatDividerModule],
  templateUrl: './package-detail.component.html',
  styleUrl: './package-detail.component.css',
})
export class PackageDetailComponent implements OnInit {
  @Input() package!: Package;

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService
  ) {}

  // getPackage(id: string) {
  //   this.packageService
  //     .getPackage(`http://localhost:3000/api/package/668ff5ef7b2e9d77aec0ae84`)
  //     .subscribe({
  //       next: (data: ApiResponse) => {
  //         console.log(data);
  //         this.package = data.data;
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       },
  //     });
  // }
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    //this.getPackage(id);
  }
}

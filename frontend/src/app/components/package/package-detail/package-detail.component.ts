import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../../types';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [],
  templateUrl: './package-detail.component.html',
  styleUrl: './package-detail.component.css',
})
export class PackageDetailComponent implements OnInit {
  package: any;

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService
  ) {}

  getPackage(id: string) {
    this.packageService
      .getPackage(`http://localhost:3000/api/package/${id}`)
      .subscribe({
        next: (data: ApiResponse) => {
          console.log(data);
          this.package = data.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.getPackage(id);
  }
}

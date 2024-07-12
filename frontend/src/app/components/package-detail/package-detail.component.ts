import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package.service';
import { ActivatedRoute } from '@angular/router';

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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.packageService.getPackage(id).subscribe((data) => {
      this.package = data.data;
    });
  }
}

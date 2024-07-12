import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.css',
})
export class PackageListComponent implements OnInit {
  packages: any[] = [];

  constructor(private userService: PackageService) {}

  ngOnInit(): void {
    this.userService.getPackages().subscribe((data) => {
      this.packages = data.data;
    });
  }

  deletePackage(id: string): void {
    this.userService.deletePackage(id).subscribe(() => {
      this.packages = this.packages.filter((pack) => pack._id !== id);
    });
  }
}

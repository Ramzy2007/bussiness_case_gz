import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../../services/package.service';

@Component({
  selector: 'app-package-form',
  standalone: true,
  imports: [],
  templateUrl: './package-form.component.html',
  styleUrl: './package-form.component.css',
})
export class PackageFormComponent implements OnInit {
  packageForm: FormGroup;
  isEdit: boolean = false;
  packageId: string;

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.packageId = this.route.snapshot.paramMap.get('id') as string;
    if (this.packageId) {
      this.isEdit = true;
      this.packageService
        .getPackage(this.packageId)
        .subscribe((data: { [key: string]: any }) => {
          this.packageForm.patchValue(data);
        });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.packageService
        .updatePackage(this.packageId, this.packageForm.value)
        .subscribe(() => {
          this.router.navigate(['/users']);
        });
    } else {
      this.packageService
        .createPackage(this.packageForm.value)
        .subscribe(() => {
          this.router.navigate(['/packages']);
        });
    }
  }
}

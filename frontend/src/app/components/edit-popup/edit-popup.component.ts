import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Package } from '../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
  FormGroup
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss'],
})
export class EditPopupComponent implements OnInit, OnChanges {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Input() package: Package = {
    id_: "",
    description: "",
    weight: 0,
    width: 0,
    height: 0,
    depth: 0,
    from_name: "",
    from_address: "",
    to_name: "",
    to_address: "",
    from_location: {
      lat: 0,
      lng: 0
    },
    to_location: {
      lat: 0,
      lng: 0
    },
    createdAt: "",
    updatedAt: ""
  };

  @Output() confirm = new EventEmitter<Package>();

  packageForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['package'] && this.packageForm) {
      this.packageForm.patchValue(this.package);
    }
  }

  initializeForm() {
    this.packageForm = this.formBuilder.group({
      from_name: ['', [Validators.required, this.specialCharacterValidator()]],
      id_: [''],
      weight: [0, [Validators.required]],
      width: [0],
      description: [''],
      height: [0],
      depth: [0],
      from_address: [''],
      to_name: [''],
      to_address: [''],
      from_location: this.formBuilder.group({
        lat: [0],
        lng: [0]
      }),
      to_location: this.formBuilder.group({
        lat: [0],
        lng: [0]
      }),
      createdAt: [''],
      updatedAt: ['']
    });
  }

  onConfirm() {
    if (this.packageForm.valid) {
      this.confirm.emit(this.packageForm.value as Package);
      this.display = false;
      this.displayChange.emit(this.display);
    }
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}

import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Pawner } from '../_model/pawner';

@Component({
  selector: 'app-pawner-info',
  templateUrl: './pawner-info.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PawnerInfoComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PawnerInfoComponent),
      multi: true
    }
  ]
})

export class PawnerInfoComponent implements OnInit, ControlValueAccessor {
  @Input() pawner;

  pawnerInfo: Pawner;

  constructor() { }

  ngOnInit(): void {
    this.pawnerInfo = this.pawner;
  }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }


  // pawnerInfo:FormGroup;

  // constructor(private fb: FormBuilder) { 
  //   this.pawnerInfo = this.fb.group({
  //     id:[Validators.required],
  //     firstName:[Validators.required],
  //     lastName:[Validators.required],
  //     contactNumber:[Validators.required],
  //     city:[Validators.required],
  //     barangay:[Validators.required],
  //     completeAddress:[Validators.required]
  //   });
  // }



}

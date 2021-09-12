import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '../_model/select';

@Component({
  selector: 'app-dialog-newcity',
  templateUrl: './dialog-newcity.component.html',
})
export class DialogNewcityComponent implements OnInit {
  @ViewChild('cityNameRef', { static: true }) cityNameRef: any;
  cityForm: FormGroup;
  isAdd: boolean = true;


  constructor(private fb: FormBuilder, private route: Router, private dialogRef:MatDialogRef<DialogNewcityComponent>) {
    this.cityForm = fb.group({
      id: [],
      cityName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cityForm.valueChanges.subscribe(() => {
      this.isAdd = !this.cityForm.valid;
    });
  }

  search() {}

  cancel() {
    this.dialogRef.close();
  }

  reset() {
    this.cityForm.reset();
    this.cityNameRef.nativeElement.focus();
  }

  add() {
    this.cityForm.reset();
    this.cityNameRef.nativeElement.focus();
  }
}

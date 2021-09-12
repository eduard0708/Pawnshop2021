import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '../_model/select';
import { DialogsService } from '../_service/dialogs.service';
import { PawnerService } from '../_service/pawner.service';


@Component({
  selector: 'app-dialog-newpawner',
  templateUrl: './dialog-newpawner.component.html',
})
export class DialogNewpawnerComponent implements OnInit {
  pawnerForm: FormGroup;
  cities:Select[]=[];
  barangays:Select[]=[];

  constructor(
    private dialogRef: MatDialogRef<DialogNewpawnerComponent>,
    private pawnerService: PawnerService,
    private fb: FormBuilder,
    private route: Router,
    private dialogService:DialogsService
  ) {
    this.pawnerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      city: ['', Validators.required],
      barangay: ['', Validators.required],
      conpleteAddress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Object.keys(this.pawnerForm).forEach( (key)=> {
    //   this.pawnerForm.get(key).disabled;
    // })

    this.dialogService.getCity().subscribe(city => this.cities = city);
    this.dialogService.getCity().subscribe(barangay => this.barangays = barangay);

  }

  cancel() {
    this.dialogRef.close();
  }

  createPawner() {
    let navigationExtras  = {
      state: {
        pawner: this.pawnerForm.value
      }
    };
    this.pawnerService.createPawner(this.pawnerForm.value);
    this.dialogRef.close();
    this.route.navigateByUrl('/transactions/newloan/', navigationExtras);
  }
}

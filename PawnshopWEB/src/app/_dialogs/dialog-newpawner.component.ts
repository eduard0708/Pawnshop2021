import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { Select } from '../_model/select';
import { DialogsService } from '../_service/dialogs.service';
import { PawnerService } from '../_service/pawner.service';


@Component({
  selector: 'app-dialog-newpawner',
  templateUrl: './dialog-newpawner.component.html',
})
export class DialogNewpawnerComponent implements OnInit {
  @ViewChild('firstNameRef',{static:true}) firstNameRef: any;
  pawnerForm: FormGroup;
  cities:Select[]=[];
  barangays:Select[]=[];
  isSave:boolean = true;

  constructor(
    private dialogRef: MatDialogRef<DialogNewpawnerComponent>,
    private pawnerService: PawnerService,
    private fb: FormBuilder,
    private route: Router,
    private dialogService:DialogsService
  ) {
    this.pawnerForm = fb.group({
      id:[],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      city: ['', Validators.required],
      barangay: ['', Validators.required],
      conpleteAddress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.pawnerForm.valueChanges.subscribe(()=> {
      this.isSave = !this.pawnerForm.valid;
    });
    this.dialogService.getCity().subscribe(city => this.cities = city);
    this.dialogService.getBarangay().subscribe(barangay => this.barangays = barangay);
  }

  cancel() {
    this.pawnerForm.reset();
    this.dialogRef.close();
  }

  reset(){
    this.pawnerForm.reset();
    this.firstNameRef.nativeElement.focus();  
  }

  createPawner() {
    console.log(this.pawnerForm.value);
    
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

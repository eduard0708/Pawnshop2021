import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PawnerService } from '../_service/pawner.service';


@Component({
  selector: 'app-dialog-newpawner',
  templateUrl: './dialog-newpawner.component.html',
})
export class DialogNewpawnerComponent implements OnInit {
  pawnerInfo: FormGroup;
 

  constructor(
    private dialogRef: MatDialogRef<DialogNewpawnerComponent>,
    private pawnerService: PawnerService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.pawnerInfo = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      conpleteAddress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    Object.keys(this.pawnerInfo).forEach( (key)=> {
      this.pawnerInfo.get(key).disabled;
    })
  }

  cancel() {
    this.dialogRef.close();
  }

  createPawner() {
    let navigationExtras  = {
      state: {
        pawner: this.pawnerInfo.value
      }
    };
    this.pawnerService.createPawner(this.pawnerInfo.value);
    this.dialogRef.close();
    this.route.navigateByUrl('/transactions/newloan/', navigationExtras);
  }
}

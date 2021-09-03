import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TestService } from '../_service/test.service';

@Component({
  selector: 'app-dialog-newpawner',
  templateUrl: './dialog-newpawner.component.html',
})
export class DialogNewpawnerComponent implements OnInit {
  pawnerInfo: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogNewpawnerComponent>,
    private testService: TestService,
    private fb:FormBuilder
  ) {
    this.pawnerInfo = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      conpleteAddress: ['', Validators.required]
    })
  }

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  createPawner() {
    this.testService.newPawner(this.pawnerInfo.value);
    this.dialogRef.close();
    console.log(this.pawnerInfo.value);
    
  }
}

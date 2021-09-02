import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-newpawner',
  templateUrl: './dialog-newpawner.component.html'
})
export class DialogNewpawnerComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogNewpawnerComponent>) { }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close();
  }
}

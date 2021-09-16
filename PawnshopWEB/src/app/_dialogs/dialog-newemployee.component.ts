import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-newemployee',
  templateUrl: './dialog-newemployee.component.html',
  styleUrls: ['../_sass/newemployee.scss']
})
export class DialogNewemployeeComponent implements OnInit {

  employeeForm:FormGroup;
  isSave:boolean = false;


  constructor(
    private dialogRef:MatDialogRef<DialogNewemployeeComponent>
  ) { }

  ngOnInit(): void {
  }


  save(){
    
  }
  reset(){

  }
  cancel(){
    this.dialogRef.close();
  }
}

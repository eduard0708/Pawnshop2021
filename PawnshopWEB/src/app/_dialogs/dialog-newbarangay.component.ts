import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Barangay } from '../_model/barangay';
import { City } from '../_model/city';
import { Select } from '../_model/select';
import { DialogsService } from '../_service/dialogs.service';

@Component({
  selector: 'app-dialog-newbarangay',
  templateUrl: './dialog-newbarangay.component.html' 
})
export class DialogNewbarangayComponent implements OnInit {
  @ViewChild('cityNameRef', { static: true }) barangayNameRef: any;
  barangayForm: FormGroup;
  isAdd: boolean = true;
  barangay:Barangay[]=[];
  cities:Select[]=[];
  city:City[]=[];
  displayedColumns:string[] =['id','name','action']
  public cityDataSource:MatTableDataSource<City>;
  public barangayDataSource:MatTableDataSource<Barangay>;
  private serviceSubscribe: Subscription;
  
  constructor(
    private fb: FormBuilder, 
    private route: Router, 
    private dialogRef:MatDialogRef<DialogNewbarangayComponent>,
    private dialogService:DialogsService
    
    ) {
    this.barangayForm = fb.group({
      id: [],
      city: ['', Validators.required],
      barangayName: ['', Validators.required],
    });
    this.cityDataSource = new MatTableDataSource<City>();
    this.barangayDataSource = new MatTableDataSource<Barangay>();
  }

  ngOnInit(): void {
    this.barangayForm.valueChanges.subscribe(() => {
      this.isAdd = !this.barangayForm.valid;
    });

    this.dialogService.getAllCity().subscribe( city => {
      this.cityDataSource = city as any;
      this.cities = city as any;
       
    })

    this.dialogService.getAllBarangay().subscribe( barangay => {
      this.barangayDataSource = barangay as any;
    })
  }

  search() {}

  cancel() {
    this.dialogRef.close();
  }

  reset() {
    this.barangayForm.reset();
    this.barangayNameRef.nativeElement.focus();
  }

  add() {
    this.barangayForm.reset();
    this.barangayNameRef.nativeElement.focus();
  }

}

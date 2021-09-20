import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { City } from '../_model/city';
import { AddressService } from '../_service/address.service';
import { DialogsService } from '../_service/dialogs.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-dialog-newcity',
  templateUrl: './dialog-newcity.component.html',
})
export class DialogNewcityComponent implements OnInit {
  @ViewChild('cityNameRef', { static: true }) cityNameRef: any;
  cityForm: FormGroup;
  isAdd: boolean = true;
  city:City;
  cities:City[]=[];
  displayedColumns:string[] =['id','name','action']
  public dataSource:MatTableDataSource<City>;
  private serviceSubscribe: Subscription;
  
  constructor(
    private fb: FormBuilder, 
    private route: Router, 
    private dialogRef:MatDialogRef<DialogNewcityComponent>,
    private dialogService:DialogsService,
    private addressService:AddressService,
    private notifier: NotifierService
    
    ) {
    this.cityForm = fb.group({
      id: [],
      cityName: ['', Validators.required],
    });
    this.dataSource = new MatTableDataSource<City>();
  }

  ngOnInit(): void {
    this.cityForm.valueChanges.subscribe(() => {
      this.isAdd = !this.cityForm.valid;
    });

    this.dialogService.getAllCity().subscribe( city => {
      this.dataSource = city as any;
    })
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
    const city ={
      "cityName":this.cityForm.controls.cityName.value
    } 
    this.addressService.addCity(city).subscribe(
      city => { this.city = city
         this.notifier.showNotification(` ${this.city.cityName} city added.`,'','success',{}) 
       }
    )
    this.cityForm.reset();
    this.cityNameRef.nativeElement.focus();
  }
}

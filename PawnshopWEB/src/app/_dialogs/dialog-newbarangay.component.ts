import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Barangay } from '../_model/barangay';
import { City } from '../_model/city';
import { AddressService } from '../_service/address.service';
import { DialogsService } from '../_service/dialogs.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-dialog-newbarangay',
  templateUrl: './dialog-newbarangay.component.html'
})
export class DialogNewbarangayComponent implements OnInit {
  @ViewChild('cityRef') cityRef: MatSelect;
  barangayForm: FormGroup;
  isAdd: boolean = true;
  barangays: Barangay[] = [];
  barangay:Barangay;
  cities: City[] = [];
  city: City[] = [];
  displayedColumns: string[] = ['id', 'name', 'action']
  public cityDataSource: MatTableDataSource<City>;
  public barangayDataSource: MatTableDataSource<Barangay>;
  private serviceSubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private dialogRef: MatDialogRef<DialogNewbarangayComponent>,
    private dialogService: DialogsService,
    private addressService: AddressService,
    private notifier: NotifierService

  ) {
    this.barangayForm = fb.group({
      id: [],
      city: ['', Validators.required],
      barangayName: ['', Validators.required],
    });

    // this.cityDataSource = new MatTableDataSource<City>();
    this.barangayDataSource = new MatTableDataSource<Barangay>();
  }

  ngOnInit(): void {
    this.barangayForm.valueChanges.subscribe(() => {
      this.isAdd = !this.barangayForm.valid;
    });
   this.getCities();
   this.getBarangays();
  }

  search() { }

  cancel() {
    this.dialogRef.close();
  }

  reset() {
    this.barangayForm.reset();
    this.cityRef.focus();
  }

  add() {
    const barangay ={
      "cityId": this.barangayForm.controls.city.value,
      "barangayName":this.barangayForm.controls.barangayName.value
    }
    this.addressService.addBarangay(barangay).subscribe(barangay => {
      this.barangay = barangay as any
      console.log(barangay);
      
      // this.notifier.showNotification(`${this.barangay.barangayName}`, '','success',{})
    })
    
    this.barangayForm.reset();
    this.cityRef.focus();
  }

  getCities() {
    this.addressService.getCities().subscribe(
      cities => this.cities = cities
    )
  }
  getBarangays() {
    this.addressService.getBarangays().subscribe(
      barangay => {
       this.barangayDataSource = barangay as any
      }
    )
    
  }
}

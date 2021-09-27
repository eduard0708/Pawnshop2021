import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { City } from '../_model/address/city';
import { AddressService } from '../_service/address.service';
import { DialogsService } from '../_service/dialogs.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-dialog-newcity',
  templateUrl: './dialog-newcity.component.html',
})
export class DialogNewcityComponent implements OnInit, AfterViewInit {
  @ViewChild('cityNameRef', { static: true }) cityNameRef: any;
  @ViewChild('paginatorRef', { static: false }) paginator: MatPaginator;

  cityForm: FormGroup;
  isAdd: boolean = true;
  city: City;
  cities: City[] = [];
  displayedColumns: string[] = ['id', 'name', 'action'];
  public dataSource: MatTableDataSource<City>;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private dialogRef: MatDialogRef<DialogNewcityComponent>,
    private dialogService: DialogsService,
    private addressService: AddressService,
    private notifier: NotifierService,
    private dtf: ChangeDetectorRef
  ) {
    this.cityForm = fb.group({
      id: [],
      cityName: ['', Validators.required],
    });

    this.dataSource = new MatTableDataSource<City>();
  }

  ngOnInit() {
    this.cityForm.valueChanges.subscribe(() => {
      this.isAdd = !this.cityForm.valid;
    }, (error) => { console.log(error) }
    );
   this.getCity();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 5000);
  }

  search() { }

  cancel() {
    this.dialogRef.close();
  }

  reset() {
    this.cityForm.reset();
    this.cityNameRef.nativeElement.focus();
  }

  add() {
    const city = {
      cityName: this.cityForm.controls.cityName.value,
    };
    this.addressService.addCity(city).subscribe((city) => {
      this.city = city;
      this.notifier.showNotification(
        ` ${this.city.cityName} city added.`, '', 'success', {});
    });
    this.cityForm.reset();
    this.cityNameRef.nativeElement.focus();
    this.getCity();
  }

  getCity() {
    this.addressService.getCities().subscribe((cities) => {
      this.dataSource = cities as any;
    },error => console.log(error));   
  }
}

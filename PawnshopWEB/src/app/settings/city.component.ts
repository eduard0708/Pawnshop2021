import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { City } from '../_model/city';
import { AddressService } from '../_service/address.service';
import { DialogsService } from '../_service/dialogs.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['_settings.sass/city.scss'
  ]
})
export class CityComponent implements OnInit, AfterViewInit {

  @ViewChild('cityRef', { static: true }) cityRef: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  cityForm: FormGroup;
  isAdd = true;
  tableLength: number;
  city: City;
  cities: City[] = [];
  displayedColumns: string[] = ['id', 'name', 'action'];
  public dataSource: MatTableDataSource<City>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifier: NotifierService,
    private addressService: AddressService
  ) {
    this.cityForm = fb.group({
      id: [],
      cityName: ['', Validators.required],
    });

    this.dataSource = new MatTableDataSource<City>();
  }

  ngOnInit() {
    this.getCity();

    this.cityForm.valueChanges.subscribe(() => {
      this.isAdd = !this.cityForm.valid;

    }, (error) => { console.log(error) }
    );

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search() { }
  reset() {
    this.cityForm.reset();
    this.cityRef.nativeElement.focus();
  }
  cancel() {
    this.router.navigateByUrl('/dashboard')
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
    this.cityRef.nativeElement.focus();
    this.getCity();
  }

  getCity() {
    this.addressService.getCities().subscribe((cities) => {
      this.cities = cities as any;
      this.dataSource.data = this.cities
      this.tableLength = this.dataSource.data.length;
    }, error => console.log(error));
  }
}
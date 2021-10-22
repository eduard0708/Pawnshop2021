import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../pages/login.component';
import { City } from '../_model/address/city';
import { AddressService } from '../_service/address.service';
import { NotifierService } from '../_service/notifier.service';
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-view-list-trasactions',
  templateUrl: './view-list-trasactions.component.html',
  styleUrls: ['../_sass/view-list-transaction.scss'],
})
export class ViewListTrasactionsComponent implements OnInit {
  @ViewChild('cityRef', { static: true }) cityRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  cityForm: FormGroup;
  isAdd = true;
  tableLength: number;
  city: City;
  cities: City[] = [];
  displayColumns: string[] = ['id', 'name', 'action'];

  transactionType:string;

  public dataSource: MatTableDataSource<City>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private notifierService: NotifierService,
    private addressService: AddressService,
    private transactionService:TransactionService
  ) {
    this.cityForm = fb.group({
      id: [],
      cityName: ['', Validators.required],
      filterText: [],
    });

   this.activatedRoute.queryParams.subscribe(params =>{
      this.transactionType = params.transType;
    })

    this.dataSource = new MatTableDataSource<City>();
  }

  ngOnInit() {
    setTimeout(() => {
      this.cityRef.nativeElement.focus();
      this.dataSource.paginator = this.paginator;
    }, 100);
    this.getCity();
    this.cityForm.valueChanges.subscribe(
      () => {
        this.isAdd = !this.cityForm.valid;
      },
      (error) => {
        console.log(error);
      }
    );

      this.transactionService.getViewListTransaction(this.transactionType).subscribe( transactionList =>{
        console.log(transactionList);

      })
  }

  filter() {
    this.dataSource.filter = this.cityForm.controls.filterText.value;
  }

  reset() {
    this.dataSource.filter = '';
    this.cityForm.reset();
    this.cityRef.nativeElement.focus();
  }
  cancel() {
    this.router.navigateByUrl('main/dashboard');
  }
  save() {
    const city = {
      cityName: this.cityForm.controls.cityName.value,
    };
    this.addressService.addCity(city).subscribe((city) => {
      this.cities = [...this.dataSource.data];
      this.cities.push(city);
      this.dataSource.data = this.cities;
      this.notifierService.success(`New city: ${city.cityName}`);
    });
    this.cityForm.reset();
    this.cityRef.nativeElement.focus();
    this.getCity();
  }

  getCity() {
    this.addressService.getCities().subscribe(
      (cities) => {
        this.dataSource.data = cities;
        this.tableLength = this.dataSource.data.length;
      },
      (error) => console.log(error)
    );
  }
}

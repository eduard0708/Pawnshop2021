import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Barangay } from '../_model/address/barangay';
import { City } from '../_model/address/city';
import { AddressService } from '../_service/address.service';
import { DialogsService } from '../_service/dialogs.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-barangay',
  templateUrl: './barangay.component.html',
  styleUrls: ['_settings.sass/barangay.scss'
  ]
})
export class BarangayComponent implements OnInit, AfterViewInit {
  @ViewChild('cityRef') cityRef: MatSelect;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  barangayForm: FormGroup;
  isAdd: boolean = true;
  barangays: Barangay[] = [];
  barangay: Barangay;
  cities: City[] = [];
  city: City[] = [];
  tableLength: number;
  displayedColumns: string[] = ['id', 'name', 'action']
  public cityDataSource: MatTableDataSource<City>;
  public barangayDataSource: MatTableDataSource<Barangay>;
  private serviceSubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogsService,
    private addressService: AddressService,
    private notifierService: NotifierService

  ) {
    this.barangayForm = fb.group({
      id: [],
      city: ['', Validators.required],
      barangayName: ['', Validators.required],
    });

    this.barangayDataSource = new MatTableDataSource<Barangay>();
  }

  ngOnInit(): void {
    this.barangayForm.valueChanges.subscribe(() => {
      this.isAdd = !this.barangayForm.valid;
    });
    this.getCities();
    this.getBarangays();
  }

  ngAfterViewInit(): void {
    this.barangayDataSource.paginator = this.paginator
  }

  search() { }

  cancel() {
    this.router.navigateByUrl('/dashboard')
  }

  reset() {
    this.barangayForm.reset();
    this.cityRef.focus();
  }

  add() {
    const barangay = {
      "cityId": this.barangayForm.controls.city.value,
      "barangayName": this.barangayForm.controls.barangayName.value
    }
    this.addressService.addBarangay(barangay).subscribe(barangay => {
      this.barangay = barangay as any
      this.notifierService.success(`New Barangay: ${this.barangay.barangayName}`)
    });

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
        this.barangays = barangay as any
        this.barangayDataSource.data = this.barangays as any;
        this.tableLength = this.barangayDataSource.data.length;
      }
    )
  }
}

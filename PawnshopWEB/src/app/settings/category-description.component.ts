import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Barangay } from '../_model/address/barangay';

import { Category } from '../_model/item/category';

import { DialogsService } from '../_service/dialogs.service';
import { ItemService } from '../_service/item.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-category-description',
  templateUrl: './category-description.component.html',
  styleUrls: ['../_sass/settings_scss/category-description.scss'
]
})
export class CategoryDescriptionComponent implements OnInit {
  @ViewChild('categoryRef') categoryRef: MatSelect;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  categoryDescriptionForm: FormGroup;
  isAdd: boolean = true;
  barangays: Barangay[] = [];
  barangay: Barangay;
  categories: Category[] = [];
  tableLength: number;
  displayedColumns: string[] = ['id', 'name', 'action']
  // public cityDataSource: MatTableDataSource<City>;
  public dataSource: MatTableDataSource<Barangay>;
  private serviceSubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogsService,
    private itemService: ItemService,
    private notifierService: NotifierService

  ) {
    this.categoryDescriptionForm = fb.group({
      id: [],
      categoryId: ['', Validators.required],
      categoryDescriptionName: ['', Validators.required],
    });

    this.dataSource = new MatTableDataSource<Barangay>();
  }

  ngOnInit(): void {
    this.categoryDescriptionForm.valueChanges.subscribe(() => {
      this.isAdd = !this.categoryDescriptionForm.valid;
    });
    this.getCategories();
    this.getBarangays();

    setTimeout(() => {
      this.categoryRef.focus();
      this.dataSource.paginator = this.paginator
    }, 100);
  }

  search() { }

  cancel() {
    this.router.navigateByUrl('main/dashboard')
  }

  reset() {
    this.categoryDescriptionForm.reset();
    this.categoryRef.focus();
  }

  add() {
    // const barangay = {
    //   "cityId": this.categoryDescriptionForm.controls.city.value,
    //   "barangayName": this.categoryDescriptionForm.controls.barangayName.value
    // }
    // this.addressService.addBarangay(barangay).subscribe(barangay => {
    //   this.barangay = barangay as any
    //   this.notifierService.success(`New Barangay: ${this.barangay.barangayName}`)
    // });

    this.categoryDescriptionForm.reset();
    this.categoryRef.focus();
  }

  getCategories() {
    this.itemService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }
  getBarangays() {
    // this.addressService.getBarangays().subscribe(
    //   barangay => {
    //     this.barangays = barangay as any
    //     this.dataSource.data = this.barangays as any;
    //     this.tableLength = this.dataSource.data.length;
    //   }
    // )
  }
}

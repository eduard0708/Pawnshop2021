import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from '../_model/item/category';
import { ItemService } from '../_service/item.service';
import { NotifierService } from '../_service/notifier.service';
import { VoucherService } from '../_service/voucher.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../_sass/settings_scss/category.scss'],
})
export class CategoryComponent implements OnInit {
  @ViewChild('categoryNameRef', { static: true }) categoryNameRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  categoryForm: FormGroup;
  isAdd = true;
  tableLength: number;
  categories: Category[] = [];
  displayColumns: string[] = ['id', 'name', 'action'];
  public dataSource: MatTableDataSource<Category>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private itemService: ItemService
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      filterText: [],
    });

    this.dataSource = new MatTableDataSource<Category>();
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.categoryNameRef.nativeElement.focus();
    }, 100);
    this.getCategory();

    this.categoryForm.valueChanges.subscribe(
      () => {
        this.isAdd = !this.categoryForm.valid;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filter() {
    this.dataSource.filter = this.categoryForm.controls.filterText.value;
  }

  reset() {
    this.dataSource.filter = '';
    this.categoryForm.reset();
    this.categoryNameRef.nativeElement.focus();
  }
  cancel() {
    this.router.navigateByUrl('main/dashboard');
  }
  save() {
     this.itemService.addCategory(this.categoryForm.value).subscribe((category) => {
      this.categories = [...this.dataSource.data]
      this.categories.push(category)
      this.dataSource.data =  this.categories ;
      this.notifierService.success(`New Voucher Type: ${category.categoryName}`);
    });
    this.categoryForm.reset();
    this.categoryNameRef.nativeElement.focus();
  }

  getCategory() {
   this.itemService.getCategories().subscribe(category => {
     this.dataSource.data = category;
     console.log(category);

   })
  }
}

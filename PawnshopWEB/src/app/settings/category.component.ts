import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Category } from '../_model/item/category';

import { ItemService } from '../_service/item.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../_sass/settings_scss/category.scss'],
})
export class CategoryComponent implements OnInit {
  @ViewChild('categoryRef', { static: true }) categoryRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  categoryForm: FormGroup;
  isAdd = true;
  tableLength: number;
  category: Category;
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'action'];
  public dataSource: MatTableDataSource<Category>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private itemService: ItemService
  ) {
    this.categoryForm = this.fb.group({
      categoryId: [],
      categoryName: ['', Validators.required],
    });

    this.dataSource = new MatTableDataSource<Category>();
  }

  ngOnInit() {
    setTimeout(() => {
      this.categoryRef.nativeElement.focus();
      this.dataSource.paginator = this.paginator;
    }, 100);

    this.categoryForm.valueChanges.subscribe(() => {
      this.isAdd = !this.categoryForm.valid;
    });
    this.getCategories();
  }

  search() {}
  reset() {
    this.categoryForm.reset();
    this.categoryRef.nativeElement.focus();
  }
  cancel() {
    this.router.navigateByUrl('main/dashboard');
  }
  save() {
    this.itemService
      .addCategory(this.categoryForm.value)
      .subscribe((category) => {
        console.log(category);

        // this.dataSource.data = category as any;
      });

    this.categoryForm.reset();
    this.categoryRef.nativeElement.focus();
  }

  getCategories() {
    this.itemService.getCategories().subscribe((categories) => {
      this.dataSource.data = categories as any;
    });
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from '../_model/item/category';
import { CategoryDescription } from '../_model/item/CategoryDescription';
import { DialogsService } from '../_service/dialogs.service';
import { ItemService } from '../_service/item.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-category-description',
  templateUrl: './category-description.component.html',
  styleUrls: ['../_sass/settings_scss/category-description.scss'],
})
export class CategoryDescriptionComponent implements OnInit {
  @ViewChild('categoryRef') categoryRef: MatSelect;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  categoryDescriptionForm: FormGroup;
  isAdd: boolean = true;
  categoryDescriptions: CategoryDescription[] = [];
  categories: Category[] = [];
  tableLength: number;
  displayedColumns: string[] = ['id', 'name', 'action'];

  public dataSource: MatTableDataSource<CategoryDescription>;

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

    this.dataSource = new MatTableDataSource<CategoryDescription>();
  }

  ngOnInit(): void {
    this.categoryDescriptionForm.valueChanges.subscribe(() => {
      this.isAdd = !this.categoryDescriptionForm.valid;
    });
    this.getCategories();
    setTimeout(() => {
      this.categoryRef.focus();
      this.dataSource.paginator = this.paginator;
    }, 100);
  }

  search() {}

  cancel() {
    this.router.navigateByUrl('main/dashboard');
  }

  reset() {
    this.categoryDescriptionForm.reset();
    this.categoryRef.focus();
  }

  add() {
    this.itemService
      .addCategoryDescription(this.categoryDescriptionForm.value)
      .subscribe((catDesc) => {
        console.log(catDesc);
      });

    this.categoryDescriptionForm.reset();
    this.categoryRef.focus();
  }

  getCategories() {
    this.itemService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  getBarangays() {}
}

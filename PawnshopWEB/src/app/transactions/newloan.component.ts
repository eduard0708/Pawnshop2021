import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../_model/item';
import { Pawner } from '../_model/pawner';
import { Select } from '../_model/select';
import { ItemService } from '../_service/item.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-newloan',
  templateUrl: './newloan.component.html',
})
export class NewloanComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('category') categoryRef: MatSelect;
  @ViewChild('categoryDescriptionRef') categoryDescriptionRef;
  @ViewChild('newLoan') newloanform;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pawner: Pawner = {} as Pawner;
  newLoan: FormGroup;
  today = new Date();
  dateMature = new Date(new Date().setMonth(new Date().getMonth() + 1));
  dateExpire = new Date(new Date().setMonth(new Date().getMonth() + 4));

  isDisable = false;
  isAddItem = true;
  displayColumns: string[] = [
    'category',
    'categoryDescription',
    'description',
    'appraisalValue',
    'action',
  ];

  categories: Select[] = [];
  categoryDescriptions: Select[] = [];

  public dataSource: MatTableDataSource<Item>;
  private serviceSubscribe: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notifierService: NotifierService,
    private itemService: ItemService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pawner = this.router.getCurrentNavigation().extras.state.pawner;
      }

      this.dataSource = new MatTableDataSource<Item>();
    });

    this.newLoan = fb.group({
      dateTransaction: [this.today],
      dateGranted: [this.today],
      dateMature: [this.dateMature],
      dateExpired: [this.dateExpire],
      category: ['', [Validators.required]],
      categoryDescriptions: ['', [Validators.required]],
      descriptions: ['', [Validators.required]],
      appraisalValue: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.newLoan.statusChanges.subscribe(() => {
      this.isAddItem = !this.newLoan.valid;
      if (this.dataSource.data.length > 0) this.categoryRef.disabled;
    });

    this.serviceSubscribe = this.itemService.items$.subscribe(
      (response) => (this.dataSource.data = response)
    );

    setTimeout(() => {
      this.categoryRef.focus();
    }, 100);

    this.itemService
      .getCategory()
      .subscribe((data) => (this.categories = data));
    this.itemService
      .getCategoryDescription()
      .subscribe((data) => (this.categoryDescriptions = data));
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onCategorySelect() {
    if (
      !(
        this.newLoan.get('category').value === '' ||
        this.newLoan.get('category').value === null
      )
    )
      this.newLoan.controls.category.disable();
  }

  onAdd() {
    let id = this.dataSource.data.length + 1;
    let categoryName: Select = this.categories.find(
      ({ id }) => id == this.newLoan.controls.category.value
    );
    let catDescName: Select = this.categoryDescriptions.find(
      ({ id }) => id == this.newLoan.controls.categoryDescriptions.value
    );

    let item: Item = {
      id: id,
      category: categoryName.name,
      categoryDescription: catDescName.name,
      description: this.newLoan.controls.descriptions.value,
      appraisalValue: this.newLoan.controls.appraisalValue.value,
    };
    this.itemService.add(item);
    this.resetAddItems();
  }

  onClear() {
    Object.keys(this.newLoan.controls).forEach((key) => {
      this.newLoan.get(key).setErrors(null);
    });
    Object.keys(this.newLoan.controls).forEach((key) => {
      this.newLoan.get(key).updateValueAndValidity();
    });
    this.resetAddItems();
  }

  delete(item: Item) {
    this.itemService.delete(item.id);
    if (this.dataSource.data.length == 0) this.resetAddItems();
  }

  setTransacitonDate() {
    this.newLoan.controls.dateTransaction.setValue(this.today);
    console.log(this.today);
  }

  resetAddItems() {
    if (this.dataSource.data.length > 0) {
      this.newLoan.controls.categoryDescriptions.setValue('');
      this.newLoan.controls.descriptions.setValue('');
      this.newLoan.controls.appraisalValue.setValue('');
      this.categoryDescriptionRef.focus();
    } else {
      this.newLoan.controls.category.setValue('');
      this.newLoan.controls.categoryDescriptions.setValue('');
      this.newLoan.controls.descriptions.setValue('');
      this.newLoan.controls.appraisalValue.setValue('');
      this.newLoan.controls.category.enable();
      this.categoryRef.focus();
    }
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}

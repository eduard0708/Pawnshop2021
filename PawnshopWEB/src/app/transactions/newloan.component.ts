import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { Item } from '../_model/item';
import { Pawner } from '../_model/pawner';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-newloan',
  templateUrl: './newloan.component.html',
})

export class NewloanComponent implements OnInit {
  @ViewChild('category') categoryRef: MatSelect;
  @ViewChild('newLoan') newloanform;
  pawner: Pawner = {} as Pawner;
  newLoan: FormGroup;
  today = new Date();
  dateMature = new Date(new Date().setMonth(new Date().getMonth() + 1));
  dateExpire = new Date(new Date().setMonth(new Date().getMonth() + 4));
  dataSource = new MatTableDataSource<Item>();
  isDisable = false;
  isAddItem = true;
  displayColumns: string[] = [
    'category',
    'categoryDescription',
    'description',
    'appraisalValue',
    'action',
  ];

  categories = [
    { value: 'gold', viewValue: 'Gold' },
    { value: 'appliance', viewValue: 'Appliances' },
  ];

  categoryDescriptions = [
    { value: 'gold', viewValue: '18K gold' },
    { value: 'gold', viewValue: '21K gold' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notifierService: NotifierService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pawner = this.router.getCurrentNavigation().extras.state.pawner;
      }
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
    this.newLoan.statusChanges.subscribe( ()=> {
      this.isAddItem = !this.newLoan.valid;
    });

    setTimeout(() => {
      this.categoryRef.focus();
    }, 100);

  }
  onCategorySelect() {
    if (this.newLoan.get('category').value === ''
      || this.newLoan.get('category').value === null) {
      this.notifierService.showNotification('Category Required', 'action', 'error', '');
      // this.categoryRef.focus();
    } else {
      this.newLoan.controls.category.disable();
    }
  }

  onAdd() {
    let item: Item = {
      category: this.newLoan.controls.category.value,
      categoryDescription: this.newLoan.controls.categoryDescriptions.value,
      description: this.newLoan.controls.descriptions.value,
      appraisalValue: this.newLoan.controls.appraisalValue.value
    }
    this.dataSource.data.push(item);
    this.dataSource.data = this.dataSource.data; //update the table changes
    this.onClear();
  }

  onClear() {
    this.newLoan.get('category').enable();
    this.categoryRef.focus();
    this.newLoan.controls.categoryDescriptions.setValue('');
    this.newLoan.controls.category.setValue('');
    this.newLoan.controls.descriptions.setValue('');
    this.newLoan.controls.appraisalValue.setValue('');
    Object.keys(this.newLoan.controls).forEach(key => {
      this.newLoan.get(key).setErrors(null);
    });
    Object.keys(this.newLoan.controls).forEach(key => {
      this.newLoan.get(key).updateValueAndValidity();
    });
    // this.newLoan.reset();
  }

  setTransacitonDate() {
    this.newLoan.controls.dateTransaction.setValue(this.today);
    console.log(this.today);

  }

}

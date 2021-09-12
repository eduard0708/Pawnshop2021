import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { Subscription } from 'rxjs';
import { Item } from '../_model/item';
import { Pawner } from '../_model/pawner';
import { Select } from '../_model/select';
import { Transaction } from '../_model/transaction';
import { ItemService } from '../_service/item.service';
import { NewloanService } from '../_service/newloan.service';
import { NotifierService } from '../_service/notifier.service';
import { RedeemService } from '../_service/redeem.service';

@Component({
  selector: 'app-newloan',
  templateUrl: './newloan.component.html',
  template: ` <input [inputMask]="currencyInputMask" placeholder="$ 0.00" /> `,
})
export class NewloanComponent implements OnInit, OnDestroy, AfterViewInit {
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '₱ ',
    placeholder: '0',
  });

  @ViewChild('principalLoanRef') principalLoanRef: MatInput;
  @ViewChild('category') categoryRef: MatSelect;
  @ViewChild('categoryDescriptionRef') categoryDescriptionRef;
  @ViewChild('newLoan') newloanform;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pawner: Pawner = {} as Pawner;
  newLoan: FormGroup;
  pawnerInfoWithDate = {} as any;
  today = new Date();
  dateMature = new Date(new Date().setMonth(new Date().getMonth() + 1));
  dateExpire = new Date(new Date().setMonth(new Date().getMonth() + 4));
  transactionType="NewLoan";
  isDisable = false;
  isAddItem = true;
  isBtnSave = true;
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
    private itemService: ItemService,
    private newLoanService: NewloanService,
    private notifier: NotifierService,
    private redeem: RedeemService
  ) {
    // get the pawner information from the params of the link
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pawner = this.router.getCurrentNavigation().extras.state.pawner;
      }
      this.dataSource = new MatTableDataSource<Item>();
    });

    this.newLoan = fb.group({
      pawner: [],
      dateTransaction: [this.today],
      dateGranted: [this.today],
      dateMature: [this.dateMature],
      dateExpired: [this.dateExpire],
      category: ['', [Validators.required]],
      categoryDescriptions: ['', [Validators.required]],
      descriptions: ['', [Validators.required]],
      appraisalValue: [0.0, [Validators.required]],
      pawnedItems: [],
      totalAppraisal: [0.0],
      principalLoan: [0.0],
      interestRate: ['0.00 %'],
      advanceInterest: [0.0],
      advanceServiceCharge: [0.0],
      netProceed: [0.0],
      test: [],
    });
  }

  ngOnInit(): void {
 
    this.newLoan.controls.principalLoan.disable();
    this.newLoan.valueChanges.subscribe(() => {
      this.validateItemEntery();

      if (this.dataSource.data.length > 0) this.categoryRef.disabled;
    });

    //compute during input of principal loan
    this.newLoan.controls.principalLoan.valueChanges.subscribe((principal) => {
      let principalLoan = +principal.toString().replace(/[^\d.-]/g, '');
      let totalApp: number = this.newLoanService.getTotalAppraisal();
      if (principalLoan > totalApp) {
        this.newLoan.controls.principalLoan.setValue(
          this.newLoanService.getTotalAppraisal()
        );
        principalLoan = this.newLoanService.getTotalAppraisal();
      }
  let advanceInterest = this.newLoanService.getAdvanceInterest(principalLoan);
      this.newLoan.controls.advanceInterest.setValue(advanceInterest);
      let advanceServiceCharge =
        this.newLoanService.getAdvanceServiceCharge(principalLoan);
      this.newLoan.controls.advanceServiceCharge.setValue(advanceServiceCharge);
      let netProceed = principalLoan + advanceServiceCharge + advanceInterest;
      this.newLoan.controls.netProceed.setValue(netProceed);

      if (principalLoan > 0) {
        this.isBtnSave = false;
      } else {
        this.isBtnSave = true;
      }
    }); //end of computetation

    this.serviceSubscribe = this.itemService.items$.subscribe((items) => {
      this.dataSource.data = items;

      let intRate = this.newLoanService.getInterestRate();
      this.newLoan.controls.totalAppraisal.setValue(
        this.newLoanService.getTotalAppraisal()
      );
      this.newLoan.controls.interestRate.setValue(intRate.toFixed(2) + ' %');
      if (items.length == 0) {
        this.newLoan.controls.principalLoan.disable();
      } else {
        this.newLoan.controls.principalLoan.enable();
      }
    });

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
      categoryId: this.newLoan.controls.category.value,
      categoryName: categoryName.name,
      categoryDescriptionId: this.newLoan.controls.categoryDescriptions.value,
      categoryDescriptionName: catDescName.name,
      description: this.newLoan.controls.descriptions.value,
      appraisalValue: this.newLoan.controls.appraisalValue.value,
    };
    this.itemService.add(item);
    this.resetAddItems();
  }

  delete(item: Item) {
    this.itemService.delete(item.id);
    if (this.dataSource.data.length == 0) this.resetAddItems();

    this.reset();
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

  toCompute() {
    document.getElementById('principal').focus();
    this.newLoan.controls.principalLoan.setValue('');
    this.reset();
  }

  home() {
    this.itemService.clear();
    this.router.navigateByUrl('/dashboard');
  }

  reset() {
    if (this.itemService.items.length == 0) {
      this.newLoan.controls.category.enable();
      this.categoryRef.focus();
    }
    this.newLoan.controls.categoryDescriptions.enable();
    this.newLoan.controls.descriptions.enable();
    this.newLoan.controls.appraisalValue.enable();
  }

  principalLoanFocus() {
    this.newLoan.controls.categoryDescriptions.disable();
    this.newLoan.controls.descriptions.disable();
    this.newLoan.controls.appraisalValue.disable();

    console.log(this.newLoan.controls.categoryDescriptions.valid);
  }

  onSave() {
    let pawner = this.pawner;
    let items = this.itemService.items;
    let intRate: string = this.newLoan.controls.interestRate.value;
    this.newLoan.controls.pawnedItems.setValue(items);
    this.newLoan.controls.pawner.setValue(pawner);

    let transaction: Transaction = {
      transactionId:1,
      pawner: pawner,
      dateTransaction: this.newLoan.controls.dateTransaction.value,
      dateGranted: this.newLoan.controls.dateGranted.value,
      dateMature: this.newLoan.controls.dateMature.value,
      dateExpired: this.newLoan.controls.dateExpired.value,
      pawnedItems: items,
      totalAppraisal: this.newLoan.controls.totalAppraisal.value,
      principalLoan: this.newLoan.controls.principalLoan.value,
      interestRate: parseFloat(intRate.toString().replace(/[^\d.-]/g, '')),
      advanceInterest: this.newLoan.controls.advanceInterest.value,
      advanceServiceCharge: this.newLoan.controls.advanceServiceCharge.value,
      netProceed: this.newLoan.controls.netProceed.value,
    };
    this.notifier.showNotification('Success new loan' ,'ok','success',{})
    console.log(transaction);
    this.itemService.clear();
    this.newLoanService.addTrasaction(transaction);
    this.router.navigateByUrl('/dashboard')
  }

  validateItemEntery() {
    let appVal: string = this.newLoan.controls.appraisalValue.value;

    if (
      this.newLoan.controls.descriptions.valid &&
      this.newLoan.controls.category.value !== '' &&
      this.newLoan.controls.categoryDescriptions.valid &&
      !(+appVal.toString().replace(/[^\d.-]/g, '') == 0 && appVal === '')
    ) {
      this.isAddItem = false;
    } else {
      this.isAddItem = true;
    }
  }
}

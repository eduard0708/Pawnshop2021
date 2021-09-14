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
import { PawnerInfo } from '../_model/pawnerInfo';
import { Select } from '../_model/select';
import { Transaction } from '../_model/transaction';
import { ItemService } from '../_service/item.service';
import { NewloanService } from '../_service/newloan.service';
import { NotifierService } from '../_service/notifier.service';
import { RedeemService } from '../_service/redeem.service';

@Component({
  selector: 'app-newloan',
  templateUrl: './newloan.component.html',
  styleUrls: ['../_sass/newloan.scss'],
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
  pawnerInfo:PawnerInfo = {} as PawnerInfo;
  pawner: Pawner = {} as Pawner;
  newLoanForm: FormGroup;
  today:Date = new Date();
  dateMatured:Date = new Date(new Date().setMonth(new Date().getMonth() + 1));
  dateExpired:Date = new Date(new Date().setMonth(new Date().getMonth() + 4));
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

        this.pawnerInfo.id = this.pawner.id;
        this.pawnerInfo.firstName = this.pawner.firstName;
        this.pawnerInfo.lastName = this.pawner.lastName;
        this.pawnerInfo.contactNumber = this.pawner.contactNumber;
        this.pawnerInfo.city = this.pawner.city;
        this.pawnerInfo.barangay = this.pawner.barangay;
        this.pawnerInfo.completeAddress = this.pawner.completeAddress;
        this.pawnerInfo.dateTransaction = new Date(this.today);
        this.pawnerInfo.dateGranted = new Date(this.today);
        this.pawnerInfo.dateMatured = new Date( this.dateMatured);
        this.pawnerInfo.dateExpired = new Date(this.dateExpired); 

      }   
    });

    this.dataSource = new MatTableDataSource<Item>();

    this. newLoanForm = fb.group({
      pawner: [],
      dateTransaction: [this.today],
      dateGranted: [this.today],
      dateMature: [this.dateMatured],
      dateExpired: [this.dateExpired],
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
 
    this. newLoanForm.controls.principalLoan.disable();
    this. newLoanForm.valueChanges.subscribe(() => {
      this.validateItemEntery();
      if (this.dataSource.data.length > 0) this.categoryRef.disabled;
    });

    //compute during input of principal loan
    this. newLoanForm.controls.principalLoan.valueChanges.subscribe((principal) => {
      let principalLoan = +principal.toString().replace(/[^\d.-]/g, '');
      let totalApp: number = this.newLoanService.getTotalAppraisal();
      if (principalLoan > totalApp) {
        this. newLoanForm.controls.principalLoan.setValue(
          this.newLoanService.getTotalAppraisal()
        );
        principalLoan = this.newLoanService.getTotalAppraisal();
      }
  let advanceInterest = this.newLoanService.getAdvanceInterest(principalLoan);
      this. newLoanForm.controls.advanceInterest.setValue(advanceInterest);
      let advanceServiceCharge =
        this.newLoanService.getAdvanceServiceCharge(principalLoan);
      this. newLoanForm.controls.advanceServiceCharge.setValue(advanceServiceCharge);
      let netProceed = principalLoan + advanceServiceCharge + advanceInterest;
      this. newLoanForm.controls.netProceed.setValue(netProceed);

      if (principalLoan > 0) {
        this.isBtnSave = false;
      } else {
        this.isBtnSave = true;
      }
    }); //end of computetation

    this.serviceSubscribe = this.itemService.items$.subscribe((items) => {
      this.dataSource.data = items;

      let intRate = this.newLoanService.getInterestRate();
      this. newLoanForm.controls.totalAppraisal.setValue(
        this.newLoanService.getTotalAppraisal()
      );
      this.newLoanForm.controls.interestRate.setValue(intRate.toFixed(2) + ' %');
      if (items.length == 0) {
        this. newLoanForm.controls.principalLoan.disable();
      } else {
        this. newLoanForm.controls.principalLoan.enable();
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
        this.newLoanForm.get('category').value === '' ||
        this.newLoanForm.get('category').value === null
      )
    )
      this.newLoanForm.controls.category.disable();
  }

  onAdd() {
    
    let id = this.dataSource.data.length + 1;

    let categoryName: Select = this.categories.find(
      ({ id }) => id == this.newLoanForm.controls.category.value
    );
    let catDescName: Select = this.categoryDescriptions.find(
      ({ id }) => id == this.newLoanForm.controls.categoryDescriptions.value
    );

    let item: Item = {
      id: id,
      categoryId: this.newLoanForm.controls.category.value,
      categoryName: categoryName.name,
      categoryDescriptionId: this.newLoanForm.controls.categoryDescriptions.value,
      categoryDescriptionName: catDescName.name,
      description: this.newLoanForm.controls.descriptions.value,
      appraisalValue: this.newLoanForm.controls.appraisalValue.value,
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
    this.newLoanForm.controls.dateTransaction.setValue(this.today);
    console.log(this.today);
  }

  resetAddItems() {
    if (this.dataSource.data.length > 0) {
      this.newLoanForm.controls.categoryDescriptions.setValue('');
      this.newLoanForm.controls.descriptions.setValue('');
      this.newLoanForm.controls.appraisalValue.setValue('');
      this.categoryDescriptionRef.focus();
    } else {
      this.newLoanForm.controls.category.setValue('');
      this.newLoanForm.controls.categoryDescriptions.setValue('');
      this.newLoanForm.controls.descriptions.setValue('');
      this.newLoanForm.controls.appraisalValue.setValue('');
      this.newLoanForm.controls.category.enable();
      this.categoryRef.focus();
    }
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  toCompute() {
    document.getElementById('principal').focus();
    this.newLoanForm.controls.principalLoan.setValue('');
    this.reset();
  }

  home() {
    this.itemService.clear();
    this.router.navigateByUrl('/dashboard');
  }

  reset() {
    if (this.itemService.items.length == 0) {
      this.newLoanForm.controls.category.enable();
      this.categoryRef.focus();
    }
    this.newLoanForm.controls.categoryDescriptions.enable();
    this.newLoanForm.controls.descriptions.enable();
    this.newLoanForm.controls.appraisalValue.enable();
  }

  principalLoanFocus() {
    this.newLoanForm.controls.categoryDescriptions.disable();
    this.newLoanForm.controls.descriptions.disable();
    this.newLoanForm.controls.appraisalValue.disable();

    console.log(this.newLoanForm.controls.categoryDescriptions.valid);
  }

  onSave() {
    let pawner = this.pawner;
    let items = this.itemService.items;
    let intRate: string = this.newLoanForm.controls.interestRate.value;
    this.newLoanForm.controls.pawnedItems.setValue(items);
    this.newLoanForm.controls.pawner.setValue(pawner);

    let transaction: Transaction = {
      transactionId:1,
      pawner: pawner,
      dateTransaction: this.newLoanForm.controls.dateTransaction.value,
      dateGranted: this.newLoanForm.controls.dateGranted.value,
      dateMature: this.newLoanForm.controls.dateMature.value,
      dateExpired: this.newLoanForm.controls.dateExpired.value,
      pawnedItems: items,
      totalAppraisal: this.newLoanForm.controls.totalAppraisal.value,
      principalLoan: this.newLoanForm.controls.principalLoan.value,
      interestRate: parseFloat(intRate.toString().replace(/[^\d.-]/g, '')),
      advanceInterest: this.newLoanForm.controls.advanceInterest.value,
      advanceServiceCharge: this.newLoanForm.controls.advanceServiceCharge.value,
      netProceed: this.newLoanForm.controls.netProceed.value,
    };
    this.notifier.showNotification('Success new loan' ,'ok','success',{})
    console.log(transaction);
    this.itemService.clear();
    this.newLoanService.addTrasaction(transaction);
    this.router.navigateByUrl('/dashboard')
  }

  validateItemEntery() {
    let appVal: string = this.newLoanForm.controls.appraisalValue.value;

    if (
      this.newLoanForm.controls.descriptions.valid &&
      this.newLoanForm.controls.category.value !== '' &&
      this.newLoanForm.controls.categoryDescriptions.valid &&
      !(+appVal.toString().replace(/[^\d.-]/g, '') == 0 && appVal === '')
    ) {
      this.isAddItem = false;
    } else {
      this.isAddItem = true;
    }
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
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
import { Category } from '../_model/category';
import { CategoryDescription } from '../_model/CategoryDescription';
import { Item } from '../_model/item';
import { PawnerAddress } from '../_model/pawner.address';
import { Pawner } from '../_model/pawner';
import { PawnerInfo } from '../_model/pawnerInfo';
import { Transaction } from '../_model/transaction';
import { ItemService } from '../_service/item.service';
import { NewloanService } from '../_service/newloan.service';
import { NotifierService } from '../_service/notifier.service';
import { RedeemService } from '../_service/redeem.service';

@Component({
  selector: 'app-newloan',
  templateUrl: './newloan.component.html',
  styleUrls: ['../_sass/newloan.scss'],
})
export class NewloanComponent implements OnInit, OnDestroy {
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '₱ ',
    placeholder: '0',
  });

  @ViewChild('principalLoanRef') principalLoanRef: MatInput;
  @ViewChild('appraisalValueRef') appraisalValueRef: ElementRef;
  @ViewChild('category') categoryRef: MatSelect;
  @ViewChild('categoryDescriptionRef') categoryDescriptionRef: MatSelect;
  @ViewChild('newLoan') newloanform;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  pawner: Pawner = {} as Pawner;
  newLoanForm: FormGroup;
  today: Date = new Date();
  dateMatured: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));
  dateExpired: Date = new Date(new Date().setMonth(new Date().getMonth() + 4));
  isDisable = false;
  isAddItem = true;
  isBtnSave = true;
  maxLoanValue: number = 9999999.99;
  displayColumns: string[] = [
    'category',
    'categoryDescription',
    'description',
    'appraisalValue',
    'action',
  ];
  categories: Category[] = [];
  categoryDescriptions: CategoryDescription[] = [];

  public dataSource: MatTableDataSource<Item>;
  private serviceSubscribe: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private itemService: ItemService,
    private newLoanService: NewloanService,
    private notifierService: NotifierService,
    private redeem: RedeemService
  ) {
    // get the pawner information from the params of the link
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pawner = this.router.getCurrentNavigation().extras.state.pawner;
        const address = {
          cityName: this.pawner.addresses[0].cityName,
          barangayName: this.pawner.addresses[0].barangayName,
          completeAddress: this.pawner.addresses[0].completeAddress,
        }
        this.pawnerInfo.id = this.pawner.id;
        this.pawnerInfo.firstName = this.pawner.firstName;
        this.pawnerInfo.lastName = this.pawner.lastName;
        this.pawnerInfo.contactNumber = this.pawner.contactNumber;
        this.pawnerInfo.city = address.cityName;
        this.pawnerInfo.barangay = address.barangayName;
        this.pawnerInfo.completeAddress = address.completeAddress;
        this.pawnerInfo.dateTransaction = new Date(this.today);
        this.pawnerInfo.dateGranted = new Date(this.today);
        this.pawnerInfo.dateMatured = new Date(this.dateMatured);
        this.pawnerInfo.dateExpired = new Date(this.dateExpired);
      }
    });

    this.dataSource = new MatTableDataSource<Item>();
    this.newLoanForm = this.fb.group({
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
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.categoryRef.focus();
    }, 100);
    this.newLoanForm.controls.principalLoan.disable();

    this.newLoanForm.valueChanges.subscribe(() => {
      this.validateItemEntery();
      if (this.dataSource.data.length > 0) this.categoryRef.disabled;
    });

    //compute during input of principal loan
    this.newLoanForm.controls.principalLoan.valueChanges.subscribe(
      (principal) => {
        let principalLoan = +(principal ?? "").toString().replace(/[^\d.-]/g, '');
        let totalApp: number = this.newLoanService.getTotalAppraisal();
        if (principalLoan > totalApp) {
          this.newLoanForm.controls.principalLoan.setValue(
            this.newLoanService.getTotalAppraisal()
          );
          principalLoan = this.newLoanService.getTotalAppraisal();
        }
        let advanceInterest =
          this.newLoanService.getAdvanceInterest(principalLoan);
        this.newLoanForm.controls.advanceInterest.setValue(advanceInterest);
        let advanceServiceCharge =
          this.newLoanService.getAdvanceServiceCharge(principalLoan);
        this.newLoanForm.controls.advanceServiceCharge.setValue(
          advanceServiceCharge
        );
        let netProceed = principalLoan + advanceServiceCharge + advanceInterest;
        this.newLoanForm.controls.netProceed.setValue(netProceed);

        if (principalLoan > 0) {
          this.isBtnSave = false;
        } else {
          this.isBtnSave = true;
        }
      }
    ); //end of computetation

    //subscribe to the item service to notify for new added item or deleted
    this.serviceSubscribe = this.itemService.items$.subscribe((items) => {
      this.dataSource.data = items;

      let intRate = this.newLoanService.getInterestRate();
      this.newLoanForm.controls.totalAppraisal.setValue(
        this.newLoanService.getTotalAppraisal()
      );
      this.newLoanForm.controls.interestRate.setValue(
        intRate.toFixed(2) + ' %'
      );
      if (items.length == 0) {
        this.newLoanForm.controls.principalLoan.disable();
      } else {
        this.newLoanForm.controls.principalLoan.enable();
      }
    });
    //  load category dropdown
    this.itemService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  //load category description during selection of category
  onCategorySelect(e) {
    this.categoryDescriptions =
      this.categories[e.value - 1].categoryDescriptions;
    if (e.value > 0) {
      this.newLoanForm.controls.category.disable();
    }
  }
  //add items
  onAdd() {
    let itemTotalValue = this.itemService.items.reduce((accumulator, current) =>
      accumulator + +(current.appraisalValue ?? "").toString().replace(/[^\d.-]/g, ''), 0);
    let currentItemValue = +(this.newLoanForm.controls.appraisalValue.value ?? "").toString().replace(/[^\d.-]/g, '');
    //check for maximum total loanable amount of 9,999,999.99 before adding
    if ((itemTotalValue + currentItemValue) > this.maxLoanValue) {

      this.notifierService.info('Maximum Total Appraisal Value is only P 9,999,999.99');
      let availableAmount = this.maxLoanValue - itemTotalValue;
      this.newLoanForm.controls.appraisalValue.setValue(availableAmount);
      this.appraisalValueRef.nativeElement.focus();
    } else {
      let id = this.dataSource.data.length + 1;
      let category: Category = this.categories.find(
        ({ categoryId }) => categoryId == this.newLoanForm.controls.category.value
      );
      let categoryDescription: CategoryDescription = this.categoryDescriptions.find(
        ({ categoryDescriptionId }) => categoryDescriptionId == this.newLoanForm.controls.categoryDescriptions.value
      );
      let item: Item = {
        id: id,
        categoryId: this.newLoanForm.controls.category.value,
        categoryName: category.categoryName,
        categoryDescriptionId:
          this.newLoanForm.controls.categoryDescriptions.value,
        categoryDescriptionName: categoryDescription.categoryDescriptionName,
        description: this.newLoanForm.controls.descriptions.value,
        appraisalValue: +(+(this.newLoanForm.controls.appraisalValue.value ?? "").toString().replace(/[^\d.-]/g, '')).toFixed(2),
      };
      this.itemService.add(item);
      this.resetAddItems();
     
    }
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
    this.newLoanForm.reset();
    this.itemService.clear();

    this.newLoanForm.controls.categoryDescriptions.enable();
    this.newLoanForm.controls.descriptions.enable();
    this.newLoanForm.controls.appraisalValue.enable();
    this.newLoanForm.controls.category.enable();
    this.categoryRef.focus();
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
      transactionId: 1,
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
      advanceServiceCharge:
        this.newLoanForm.controls.advanceServiceCharge.value,
      netProceed: this.newLoanForm.controls.netProceed.value,
    };
    // this.notifier.showNotification('Success new loan', 'ok', 'success', {});
    console.log(transaction);
    this.itemService.clear();
    this.newLoanService.addTrasaction(transaction);
    this.router.navigateByUrl('/dashboard');
  }

  validateItemEntery() {
    let appVal: string = this.newLoanForm.controls.appraisalValue.value;
    if (
      this.newLoanForm.controls.descriptions.valid &&
      this.newLoanForm.controls.category.value !== '' &&
      this.newLoanForm.controls.categoryDescriptions.valid &&
      !(+(appVal ?? '').toString().replace(/[^\d.-]/g, '') == 0 && appVal === '')
    ) {
      this.isAddItem = false;
    } else {
      this.isAddItem = true;
    }
  }
}

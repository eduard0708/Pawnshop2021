import {
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
import { Category } from '../_model/item/category';
import { CategoryDescription } from '../_model/item/CategoryDescription';
import { Pawner } from '../_model/pawner/Pawner';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { ItemService } from '../_service/item.service';
import { NewloanService } from '../_service/newloan.service';
import { NotifierService } from '../_service/notifier.service';
import { Item } from '../_model/item/item';

import * as moment from 'moment';
import 'moment-precise-range-plugin';
import { ComputationService } from '../_service/computation.service';

declare module 'moment' {
  function preciseDiff(
    start: string | Date | moment.Moment,
    end: string | Date | moment.Moment,
    convertToObject?: boolean
  ): any;
}

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
  item: Item = {} as Item;
  newLoanForm: FormGroup;
  isDisable = false;
  isAddItem = true;
  isSave = true;
  maxLoanValue: number = 9999999.99;
  displayColumns: string[] = [
    '#',
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
    private computationService: ComputationService
  ) {
    // get the pawner information from the params of the link
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pawner = this.router.getCurrentNavigation().extras.state.pawner;
        const address = {
          cityName: this.pawner.addresses[0].cityName,
          barangayName: this.pawner.addresses[0].barangayName,
          completeAddress: this.pawner.addresses[0].completeAddress,
        };
        this.pawnerInfo.pawnerId = this.pawner.pawnerId;
        this.pawnerInfo.pawnerId = this.pawner.pawnerId;
        this.pawnerInfo.firstName = this.pawner.firstName;
        this.pawnerInfo.lastName = this.pawner.lastName;
        this.pawnerInfo.contactNumber = this.pawner.contactNumber;
        this.pawnerInfo.city = address.cityName;
        this.pawnerInfo.barangay = address.barangayName;
        this.pawnerInfo.completeAddress = address.completeAddress;
      }
    });

    this.dataSource = new MatTableDataSource<Item>();

    this.newLoanForm = this.fb.group({
      dateTransaction: [],
      dateGranted: [],
      dateMatured: [],
      dateExpired: [],
      category: ['', [Validators.required]],
      categoryDescriptions: ['', [Validators.required]],
      descriptions: ['', [Validators.required]],
      appraisalValue: [0.0, [Validators.required]],
      totalAppraisal: [0.0],
      principalLoan: [0.0],
      interestRate: ['0.00 %'],
      advanceInterest: [0.0],
      advanceServiceCharge: [0.0],
      netProceed: [0.0],
    });
  }

  ngOnInit(): void {
    this.newLoanForm.controls.dateTransaction.setValue(new Date());
    this.setDate();
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.categoryRef.focus();
    }, 100);

    this.newLoanForm.controls.principalLoan.disable();

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
      if (items.length === 0) {
        this.newLoanForm.controls.principalLoan.disable();
      } else {
        this.newLoanForm.controls.principalLoan.enable();
      }

      this.validateButtonSave();
    });
    this.newLoanForm.valueChanges.subscribe(() => {
      this.validateItemEntry();
      if (this.dataSource.data.length > 0) this.categoryRef.disabled;
    });

    this.newLoanForm.controls.dateTransaction.valueChanges.subscribe(() => {
      this.setDate();
    });

    //compute during input of principal loan
    this.newLoanForm.controls.principalLoan.valueChanges.subscribe(
      (principal) => {
        let principalLoan = +(principal ?? 0)
          .toString()
          .replace(/[^\d.-]/g, '');
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
        let netProceed = principalLoan - advanceServiceCharge - advanceInterest;
        this.newLoanForm.controls.netProceed.setValue(netProceed);

        this.validateButtonSave();
      }
    ); //end of computetation

    //  load category dropdown
    this.itemService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  setDate() {
    const _transactionDate = this.newLoanForm.controls.dateTransaction.value;
    const _maturedDate = new Date(_transactionDate).setMonth(
      new Date(_transactionDate).getMonth() + 1
    );
    const _expiredDate = new Date(_transactionDate).setMonth(
      new Date(_transactionDate).getMonth() + 4
    );
    this.newLoanForm.controls.dateGranted.setValue(new Date(_transactionDate));
    this.newLoanForm.controls.dateMatured.setValue(new Date(_maturedDate));
    this.newLoanForm.controls.dateExpired.setValue(new Date(_expiredDate));
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
    let itemTotalValue = this.itemService.items.reduce(
      (accumulator, current) =>
        accumulator +
        this.computationService.stringToNumber(current.appraisalValue),
      0
    );
    let currentItemValue = +this.computationService.stringToNumber(
      this.newLoanForm.controls.appraisalValue.value
    );
    //check for maximum total loanable amount of 9,999,999.99 before adding
    if (itemTotalValue + currentItemValue > this.maxLoanValue) {
      this.notifierService.info(
        'Maximum Total Appraisal Value is only P 9,999,999.99'
      );
      let availableAmount = this.maxLoanValue - itemTotalValue;
      this.newLoanForm.controls.appraisalValue.setValue(availableAmount);
      this.appraisalValueRef.nativeElement.focus();
    } else {
      let id = this.dataSource.data.length + 1;
      let category: Category = this.categories.find(
        ({ categoryId }) =>
          categoryId == this.newLoanForm.controls.category.value
      );
      let categoryDescription: CategoryDescription =
        this.categoryDescriptions.find(
          ({ categoryDescriptionId }) =>
            categoryDescriptionId ==
            this.newLoanForm.controls.categoryDescriptions.value
        );

      let item: Item = {
        itemId: id,
        categoryId: category.categoryId,
        category: category.categoryName,
        categoryDescription: categoryDescription.categoryDescriptionName,
        description: this.newLoanForm.controls.descriptions.value,
        appraisalValue: this.computationService.stringToNumber(
          this.newLoanForm.controls.appraisalValue.value
        ),
      };
      this.itemService.add(item);
      this.resetAddItems();
    }
  }

  delete(item: Item) {
    this.itemService.delete(item.itemId);
    if (this.dataSource.data.length == 0) this.resetAddItems();
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
    this.router.navigateByUrl('main/dashboard');
  }

  reset() {
    this.newLoanForm.reset();
    this.itemService.clear();

    this.newLoanForm.controls.categoryDescriptions.enable();
    this.newLoanForm.controls.descriptions.enable();
    this.newLoanForm.controls.appraisalValue.enable();
    this.newLoanForm.controls.category.enable();
    this.categoryRef.focus();
    this.newLoanForm.controls.dateTransaction.setValue(new Date());
  }

  principalLoanFocus() {
    this.newLoanForm.controls.categoryDescriptions.disable();
    this.newLoanForm.controls.descriptions.disable();
    this.newLoanForm.controls.appraisalValue.disable();
  }

  save() {
    this.newLoanService.normalizedNewloanInfo(
      this.newLoanForm.value,
      this.pawnerInfo,
      this.itemService.items
    );
  }

  validateItemEntry() {
    let appVal: string = this.newLoanForm.controls.appraisalValue.value;
    if (
      this.newLoanForm.controls.descriptions.valid &&
      this.newLoanForm.controls.category.value !== '' &&
      this.newLoanForm.controls.categoryDescriptions.valid &&
      !(
        +(appVal ?? '').toString().replace(/[^\d.-]/g, '') == 0 && appVal === ''
      )
    ) {
      this.isAddItem = false;
    } else {
      this.isAddItem = true;
    }
  }

  validateButtonSave() {
    const _principalLoan = this.computationService.stringToNumber(
      this.newLoanForm.controls.principalLoan.value
    );

    if (_principalLoan !== 0 && this.itemService.items.length !== 0) {
      this.isSave = false;
    } else {
      this.isSave = true;
    }
  }
}

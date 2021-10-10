import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { DateHelper } from '../_model/DateHelper';
import { Item } from '../_model/item/item';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { TotalYYMMDD } from '../_model/totalYYMMDD';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { ComputationService } from '../_service/computation.service';
import { RedeemService } from '../_service/redeem.service';
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['../_sass/shared-transaction.scss'],
})
export class AdditionalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('receivedAmountRef') receivedAmountRef: ElementRef;
  @ViewChild('discountRef') discountRef: ElementRef;
  @ViewChild('additionalAmountRef') additionalAmountRef: ElementRef;

  transactionInfo: NewTransaction = {} as NewTransaction;
  items: Item[] = [];
  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  additionalForm: FormGroup;
  moments;
  principalLoan: number;
  totalDays: number;
  interest: number;
  penalty: number;
  dueAmount: number;
  serviceCharge: number;
  advanceInterest: number;
  advanceServiceCharge: number;
  isDiscount: boolean;
  netPayment: number;
  availlableAmount: number;
  interestRate: number;
  countYYMMDD: TotalYYMMDD;
  dateStatus;

  displayColumns: string[] = [
    'index',
    'category',
    'categoryDescription',
    'description',
    'appraisalValue',
  ];
  public dataSource: MatTableDataSource<Item>;

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '₱ ',
    placeholder: '0',
  });

  constructor(
    private redeemService: RedeemService,
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private computationService: ComputationService,
    private transactionService: TransactionService
  ) {
    // get the pawner information from the params of the link, from dialog-transaction component
    // pawner info will go to transaction-pawner-info component
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.transactionInfo =
          this.router.getCurrentNavigation().extras.state.transaction;
        const normalizeInfo = this.redeemService.normalizePawnerInfo(
          this.transactionInfo
        );
        this.items = normalizeInfo.items;
      }
    });

    //call function for date helper to know the difference of the date of maturity and expired
    this.dateStatus = new DateHelper(
      new Date(this.transactionInfo.dateTransaction),
      new Date(this.transactionInfo.dateMature),
      new Date(this.transactionInfo.dateExpire)
    );

    this.additionalForm = fb.group({
      dateTransaction: [new Date()],
      dateGranted: [],
      dateMatured: [],
      dateExpired: [],
      totalAppraisal: [],
      transaction: [],
      // totalDays: [dateStatus.days()],
      // totalMonths: [dateStatus.months()],
      // totalYears: [dateStatus.years()],
      principalLoan: [0],
      interestRate: [0],
      interest: [0],
      penalty: [0],
      dueAmount: [0],
      advanceInterest: [0],
      advanceServiceCharge: [0],
      discount: [0],
      netPayment: [0],
      availlableAmount: [0],
      additionalAmount: [0],
      change: [0],
      status: [this.dateStatus.status()],
      moments: [this.dateStatus.moments()],
    });

    this.dataSource = new MatTableDataSource<Item>();
  }

  ngOnInit(): void {
    //convert datatrasactionItems as Items to load in table dataSource
    if (this.transactionInfo.transactionItems.length !== 0)
      this.dataSource.data =
        this.transactionService.normalizeItemsForTable(
          this.transactionInfo.transactionItems
        ) ?? [];

    //get the total number of years, months and days
    this.countYYMMDD = this.dateStatus.getmoments(
      new Date(this.transactionInfo.dateMature)
    );

    //get the total days in moments
    this.totalDays = this.computationService.getTotalDays(
      this.countYYMMDD.days,
      this.countYYMMDD.months,
      this.countYYMMDD.years
    );

    // discount value changes computations
    this.additionalForm.controls.discount.valueChanges.subscribe(
      (discountNumber: number) => {
        //start discount to zero if lessthan 0 and 0 if morethan 4
        if (discountNumber < 0)
          this.additionalForm.controls.discount.setValue(0);
        if (discountNumber >= 4)
          this.additionalForm.controls.discount.setValue(0);
        //end discount to zero if lessthan 0 and 0 if morethan 4

        const discountInterest = this.computationService.getDiscountInterest(
          this.principalLoan,
          this.interestRate,
          this.computationService.stringToNumber(discountNumber)
        );
        const _interest = this.interest;
        this.additionalForm.controls.interest.setValue(
          _interest - discountInterest
        );
      }
    );

    this.additionalForm.controls.additionalAmount.valueChanges.subscribe(
      (additionnalAmount) => {
        const availlableAmount = this.computationService.stringToNumber(
          this.additionalForm.controls.availlableAmount.value
        );
        const advanceServiceCharge = this.computationService.getServiceCharge(
          this.computationService.stringToNumber(additionnalAmount)
        );

        if (
          this.computationService.stringToNumber(additionnalAmount) >
          availlableAmount
        ) {
          this.additionalForm.controls.additionalAmount.setValue(
            availlableAmount
          );
        }
        this.additionalForm.controls.advanceServiceCharge.setValue(
          advanceServiceCharge
        );
      }
    );

    //set focus to discount during init if not disabled
    setTimeout(() => {
      if (this.additionalForm.controls.discount.untouched) {
        this.setComputation();
      }
    }, 100);
  }

  save() {
    // const amountReceived = this.computationService.stringToNumber(
    //   this.additionalForm.controls.receivedAmount.value
    // );
    // const addintonalAmount = this.computationService.stringToNumber(
    //   this.additionalForm.controls.addintonalAmount.value
    // );
    // if (addintonalAmount > amountReceived) {
    //   this.additionalForm.controls.receivedAmount.setValue('');
    //   // this.receivedAmountRef.nativeElement.focus();
    //   alert('Enter valid amount received');
    // }
  }

  reset() {
    this.additionalForm.reset();
    this.setComputation();
    // this.receivedAmountRef.nativeElement.focus();
  }

  home() {
    this.router.navigateByUrl('main/dashboard');
  }

  discountFocus(e) {
    if (e.key.toLowerCase() === 'd') this.discountRef.nativeElement.focus();
  }

  receivedAmountFocus(e) {
    if (e.key.toLowerCase() === 'a')
      this.receivedAmountRef.nativeElement.focus();
  }

  setComputation() {
    this.interestRate = this.computationService.stringToNumber(
      this.transactionInfo.interestRate
    );
    this.principalLoan = this.computationService.stringToNumber(
      this.transactionInfo.principalLoan
    );

    // set discount disabled
    if (
      this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMature)
      )
    ) {
      this.additionalForm.controls.discount.setValue(0);
      this.additionalForm.controls.discount.disable();
    }

    this.principalLoan = this.transactionInfo.principalLoan;

    this.interest = this.computationService.getInterest(
      this.principalLoan,
      this.transactionInfo.interestRate,
      this.totalDays
    );
    this.penalty = this.computationService.penalty(
      this.principalLoan,
      this.countYYMMDD
    );

    this.advanceInterest = this.computationService.getAdvanceInterest(
      this.principalLoan,
      this.transactionInfo.interestRate
    );
    this.dueAmount = this.interest + this.penalty;
    this.availlableAmount =
      this.transactionInfo.totalAppraisal - this.transactionInfo.principalLoan;

    this.netPayment =
      +this.dueAmount + this.advanceServiceCharge + this.advanceInterest;

    this.additionalForm.controls.dateTransaction.setValue(new Date());
    this.additionalForm.controls.status.setValue(this.dateStatus.status());
    this.additionalForm.controls.moments.setValue(
      `Years: ${this.countYYMMDD.years} Months: ${this.countYYMMDD.months} Days: ${this.countYYMMDD.days}`
    );
    this.additionalForm.controls.totalAppraisal.setValue(
      this.transactionInfo.totalAppraisal
    );
    this.additionalForm.controls.principalLoan.setValue(
      this.transactionInfo.principalLoan
    );
    this.additionalForm.controls.interestRate.setValue(
      `${this.transactionInfo.interestRate}%`
    );
    this.additionalForm.controls.change.setValue(0);
    this.additionalForm.controls.interest.setValue(this.interest);
    this.additionalForm.controls.penalty.setValue(this.penalty);
    this.additionalForm.controls.dueAmount.setValue(this.dueAmount);
    this.additionalForm.controls.discount.setValue('');
    this.additionalForm.controls.advanceInterest.setValue(this.advanceInterest);
    this.additionalForm.controls.advanceServiceCharge.setValue(
      this.advanceServiceCharge
    );
    this.additionalForm.controls.availlableAmount.setValue(
      this.availlableAmount
    );
    this.additionalForm.controls.additionalAmount.setValue('');

    //set paginator and set cursor focus during init
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.isDiscount = this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMature)
      );

      if (!this.isDiscount) this.discountRef.nativeElement.focus();
      if (this.isDiscount) this.additionalAmountRef.nativeElement.focus();
    }, 100);
  }
}

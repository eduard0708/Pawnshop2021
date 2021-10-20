import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { TransactionStatus, TransactionType } from '../_enum/enums';
import { DateHelper } from '../_model/DateHelper';
import { Item } from '../_model/item/item';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { TotalYYMMDD } from '../_model/totalYYMMDD';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { ComputationService } from '../_service/computation.service';
import { NotifierService } from '../_service/notifier.service';
import { PawnerService } from '../_service/pawner.service';
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['../_sass/shared-transaction.scss'],
})
export class RenewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('receivedAmountRef') receivedAmountRef: ElementRef;
  @ViewChild('discountRef') discountRef: ElementRef;
  @ViewChild('netPaymentRef') netPaymentRef: ElementRef;
  transactionInfo: NewTransaction = {} as NewTransaction;
  items: Item[] = [];
  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  renewForm: FormGroup;
  moments;
  isReadOnlyDiscount = false;
  isSave = true;

  principalLoan: number;
  daysCount: number;
  interest: number;
  penalty: number;
  dueAmount: number;
  advanceInterest: number;
  advanceServiceCharge: number;
  netPayment: number;
  isDiscount: boolean;
  totalDays: number;
  interestRate: number;
  countYYMMDD: TotalYYMMDD;
  dateStatus;

  //declare the columns of the table
  displayColumns: string[] = [
    'index',
    'category',
    'categoryDescription',
    'description',
    'appraisalValue',
  ];
  // initialize datasource as material data source and Item type
  public dataSource: MatTableDataSource<Item>;
  //initialize currency type to be used in input currency mask
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '₱ ',
    placeholder: '0',
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private computationService: ComputationService,
    private transactionService: TransactionService,
    private notifierService: NotifierService,
    private pawnerService: PawnerService
  ) {
    /* get the pawner information from the params of the link, from dialog-transaction component
    pawner info will go to transaction-pawner-info component */
    // get the pawner information from the params of the link, from dialog-transaction component
    // pawner info will go to transaction-pawner-info component
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.transactionInfo =
          this.router.getCurrentNavigation().extras.state.transaction;
      }
    });
    //call function for date helper to know the difference of the date of maturity and expired
    this.dateStatus = new DateHelper(
      new Date(this.transactionInfo.dateTransaction),
      new Date(this.transactionInfo.dateMatured),
      new Date(this.transactionInfo.dateExpired)
    );

    /* initialzed form field */
    this.initRenewForm();
    //initialized data source as a mat table data source and type Item
    this.dataSource = new MatTableDataSource<Item>();
  }

  ngOnInit(): void {
    //convert datatrasactionItems as Items to load in table dataSource
    if (this.transactionInfo.transactionItems.length !== 0)
      this.dataSource.data =
        this.transactionService.normalizeItemsForTable(
          this.transactionInfo.transactionItems
        ) ?? [];

    /* send data to pawnerService to normalalized asa pawnerInfo Type and send
      to transaction-pawner-info.component to display */
    const pawner = this.pawnerService.normalizedPawnerInfo(
      this.transactionInfo.transactionPawner,
      this.transactionInfo.dateTransaction,
      this.transactionInfo.dateGranted,
      this.transactionInfo.dateMatured,
      this.transactionInfo.dateExpired
    );

    this.pawnerService.takePawnerInfo(pawner);

    //get the total number of years, months and days
    this.countYYMMDD = this.dateStatus.getmoments(
      new Date(this.transactionInfo.dateMatured)
    );

    this.setComputation();
  }
  /* validation check the partial amount and the amount received before activating the save button */
  ngDoCheck(): void {
    const netPayment = this.computationService.stringToNumber(
      this.renewForm.controls.netPayment.value
    );
    let _receivedAmount = this.computationService.stringToNumber(
      this.renewForm.controls.receivedAmount.value
    );
    if (netPayment > 0 && _receivedAmount >= netPayment) {
      this.isSave = false;
    } else {
      this.isSave = true;
    }

    this.renewForm.controls.change.setValue(_receivedAmount - netPayment);
  }

  setDate() {
    const _transactionDate = new Date();
    const _maturedDate = new Date(_transactionDate).setMonth(
      new Date(_transactionDate).getMonth() + 1
    );
    const _expiredDate = new Date(_transactionDate).setMonth(
      new Date(_transactionDate).getMonth() + 4
    );
    this.renewForm.controls.dateTransaction.setValue(
      new Date(_transactionDate)
    );
    this.renewForm.controls.dateGranted.setValue(new Date(_transactionDate));
    this.renewForm.controls.dateMatured.setValue(new Date(_maturedDate));
    this.renewForm.controls.dateExpired.setValue(new Date(_expiredDate));
  }
  save() {
    const _amountReceived = this.computationService.stringToNumber(
      this.renewForm.controls.receivedAmount.value
    );
    const _netPayment = this.computationService.stringToNumber(
      this.renewForm.controls.netPayment.value
    );

    if (_netPayment > _amountReceived) {
      this.renewForm.controls.receivedAmount.setValue('');
      this.receivedAmountRef.nativeElement.focus();
      this.notifierService.info(
        'Received amount must be equal or greatherthan Net Payment amount.'
      );
      return;
    }

    this.transactionService.normalizedTransactionInformation(
      this.renewForm.value,
      this.transactionInfo.transactionPawner,
      this.transactionInfo.transactionItems
    );

    // console.log(this.renewForm.value);
  }
  // reset the transaction
  reset() {
    this.renewForm.reset();
    this.initRenewForm();
    this.ngOnInit();
    this.setDate();
    // start condition to enable the discount field and focus if the discount is availlable
    this.setComputation();
    if (
      this.countYYMMDD.days === 0 ||
      (this.countYYMMDD.days <= 4 &&
        this.renewForm.controls.status.value == 'Matured' &&
        this.countYYMMDD.months === 0 &&
        this.countYYMMDD.years === 0)
    ) {
      this.renewForm.controls.discount.enable();
    }
    // end condition to enable the discount field and focus if the discount is availlable
  }

  home() {
    this.router.navigateByUrl('main/dashboard');
  }
  //set value of interest, penalty and due amount during the value changes of discount
  computeDiscount() {
    /* take value of discount to be used in computation of th discount */
    let discountNumber = this.computationService.stringToNumber(
      this.renewForm.controls.discount.value
    );
    /* start discount to zero if lessthan 0 and 0 if morethan 4 */
    if (discountNumber < 0) this.renewForm.controls.discount.setValue(0);
    if (discountNumber >= 4) this.renewForm.controls.discount.setValue(0);
    /* end discount to zero if lessthan 0 and 0 if morethan 4 */

    /* setting discount number to 0 to before parsing to computation */
    if (discountNumber < 0 || discountNumber > 3) discountNumber = 0;

    /* start computation for interest here */
    const _discountInterest = this.computationService.getDiscountInterest(
      this.principalLoan,
      this.interestRate,
      this.computationService.stringToNumber(discountNumber)
    );
    console.log(this.principalLoan);
    console.log(this.interestRate);
    console.log(discountNumber);
    const _interest = this.interest;
    //set value of interest

    this.renewForm.controls.interest.setValue(_interest - _discountInterest);
    /* end computation for interest here */
    const _penalty = this.computationService.getDiscountPenalty(
      this.principalLoan,
      this.countYYMMDD,
      this.computationService.stringToNumber(discountNumber)
    );
    //set value for penalty
    this.renewForm.controls.penalty.setValue(_penalty);

    this.dueAmount =
      this.computationService.stringToNumber(
        this.renewForm.controls.interest.value
      ) +
      this.computationService.stringToNumber(
        this.renewForm.controls.penalty.value
      );
    //set value for dueAmount during discount value changes
    this.renewForm.controls.dueAmount.setValue(this.dueAmount);
    //set value for netPayment during discount value changes
    this.renewForm.controls.netPayment.setValue(
      this.computationService.stringToNumber(
        this.renewForm.controls.dueAmount.value
      ) +
        this.computationService.stringToNumber(
          this.renewForm.controls.advanceInterest.value
        ) +
        this.computationService.stringToNumber(
          this.renewForm.controls.advanceServiceCharge.value
        )
    );
  }
  /*  set to disable the discount if focus already in additional amount */
  amountReceivedFocus() {
    this.renewForm.controls.discount.disable();
  }

  setComputation() {
    /* set interest value use for global */
    this.interestRate = this.computationService.stringToNumber(
      this.transactionInfo.interestRate
    );
    //get the total days in moments
    this.totalDays = this.computationService.getTotalDays(
      this.countYYMMDD.days,
      this.countYYMMDD.months,
      this.countYYMMDD.years
    );

    this.principalLoan = this.transactionInfo.principalLoan;
    this.daysCount = this.computationService.getTotalDays(
      this.countYYMMDD.days,
      this.countYYMMDD.months,
      this.countYYMMDD.years
    );

    // set discount readOnly if preMature
    if (
      this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMatured)
      )
    ) {
      this.renewForm.controls.discount.setValue(0);
      this.isReadOnlyDiscount = true;
    }
    /* set principal loan value use for global */
    this.principalLoan = this.transactionInfo.principalLoan;

    /* set interest  value use for global */
    this.interest = this.computationService.getInterest(
      this.principalLoan,
      this.transactionInfo.interestRate,
      this.totalDays
    );
    /* set penalty value use for global */
    this.penalty = this.computationService.penalty(
      this.principalLoan,
      this.countYYMMDD
    );
    /* set advance interest value use for global */
    this.advanceInterest = this.computationService.getAdvanceInterest(
      this.principalLoan,
      this.transactionInfo.interestRate
    );
    /* set due amount value use for global */
    this.dueAmount = this.interest + this.penalty;
    this.advanceServiceCharge = this.computationService.getServiceCharge(
      this.principalLoan
    );
    /* set netPayment value use for global */
    this.netPayment =
      +this.dueAmount + this.advanceServiceCharge + this.advanceInterest;

    this.renewForm.controls.dateTransaction.setValue(new Date());
    this.renewForm.controls.moments.setValue(
      `Years: ${this.countYYMMDD.years} Months: ${this.countYYMMDD.months} Days: ${this.countYYMMDD.days}`
    );
    this.renewForm.controls.totalAppraisal.setValue(
      this.transactionInfo.totalAppraisal
    );
    this.renewForm.controls.principalLoan.setValue(
      this.transactionInfo.principalLoan
    );
    this.renewForm.controls.interestRate.setValue(
      `${this.transactionInfo.interestRate}%`
    );
    this.renewForm.controls.change.setValue(0);
    this.renewForm.controls.interest.setValue(this.interest);
    this.renewForm.controls.penalty.setValue(this.penalty);
    this.renewForm.controls.dueAmount.setValue(this.dueAmount);
    this.renewForm.controls.discount.setValue('');
    this.renewForm.controls.advanceInterest.setValue(this.advanceInterest);
    this.renewForm.controls.advanceServiceCharge.setValue(
      this.advanceServiceCharge
    );
    this.renewForm.controls.netPayment.setValue(this.netPayment);
    this.renewForm.controls.receivedAmount.setValue('');

    //set paginator and set cursor focus during init
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.isDiscount = this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMatured)
      );
      if (!this.isDiscount) this.discountRef.nativeElement.focus();
      if (this.isDiscount) this.receivedAmountRef.nativeElement.focus();
    }, 100);
  }

  initRenewForm() {
    this.renewForm = this.fb.group({
      previousTransactionId: [this.transactionInfo.transactionsId], //used to search and mark close the previous number
      trackingId: [this.transactionInfo.trackingId],
      dateTransaction: [],
      dateGranted: [],
      dateMatured: [],
      dateExpired: [],
      transactionType: [TransactionType.Renew],
      loanStatus: [this.dateStatus.status()],
      status: [TransactionStatus.Active],
      moments: [this.dateStatus.moments()],
      employeeId: [0],
      totalAppraisal: [0],
      principalLoan: [0],
      interestRate: [0],
      interest: [0],
      penalty: [0],
      dueAmount: [0],
      discount: [0, [Validators.min(0), Validators.max(3)]],
      advanceInterest: [0],
      advanceServiceCharge: [0],
      serviceCharge: [0],
      netProceed: [0],
      netPayment: [0],
      redeemAmount: [0, Validators.required], //for redeem only
      partialAmount: [0], // for partial
      availlableAmount: [0], //for additional only
      additionalAmount: [0], //for additional only
      newPrincipalLoan: [0], //for additional and Partial
      receivedAmount: [0],
      change: [0],
    });
    this.setDate();
  }
}

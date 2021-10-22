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
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['../_sass/shared-transaction.scss'],
})
export class RedeemComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('receivedAmountRef') receivedAmountRef: ElementRef;
  @ViewChild('discountRef') discountRef: ElementRef;
  transactionInfo: NewTransaction = {} as NewTransaction;
  items: Item[] = [];
  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  redeemForm: FormGroup;
  isReadOnlyDiscount = false;
  isSave = true;

  previousTransactionId;
  moments;
  principalLoan: number;
  totalDays: number;
  interestRate: number;
  interest: number;
  penalty: number;
  dueAmount: number;
  serviceCharge: number;
  advanceInterest: number;
  advanceServiceCharge: number;
  redeemAmount: number;
  isDiscount: boolean;
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
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private computationService: ComputationService,
    private trasactionService: TransactionService,
    private notifierService: NotifierService,
    private pawnerService: PawnerService
  ) {
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
    this.initRedeemForm();
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

    /* send data to pawnerService to normalalized as pawnerInfo Type and send
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

    //get the total days in moments
    this.totalDays = this.computationService.getTotalDays(
      this.countYYMMDD.days,
      this.countYYMMDD.months,
      this.countYYMMDD.years
    );

    this.redeemForm.controls.receivedAmount.valueChanges.subscribe(
      (amountReceived): void => {
        const redeemAmount = this.computationService.stringToNumber(
          this.redeemForm.controls.redeemAmount.value
        );
        let recivedAmount =
          this.computationService.stringToNumber(amountReceived);

          this.redeemForm.controls.change.setValue(recivedAmount - redeemAmount)

        if(recivedAmount >= redeemAmount){
          this.isSave = false;
        }else{
          this.isSave = true;
        }

      }
    );

    this.setComputation();
  }

  save() {
    /* start validatation before saving */
    const amountReceived = this.computationService.stringToNumber(
      this.redeemForm.controls.receivedAmount.value
    );
    const redeemAmount = this.computationService.stringToNumber(
      this.redeemForm.controls.redeemAmount.value
    );
    if (redeemAmount > amountReceived) {
      this.notifierService.info(
        'Amount recieved must equal or greater than Redeem amount.'
      );
      this.receivedAmountRef.nativeElement.focus();
      this.redeemForm.controls.receivedAmount.setValue('');
      return;
    }
    /* send the form value to the the transactoinService to normalized the value and save to database */
    // this.transactionService.normalizedTransationInfo(
    //   { transactionInfo: this.redeemForm.value, pawnerInfo: this.transactionInfo.transactionPawner, itemsInfo: this.transactionInfo.transactionItems }    );

    this.transactionService.normalizedTransactionInformation(
      this.redeemForm.value,
      this.transactionInfo.transactionPawner,
      this.transactionInfo.transactionItems
    );
  }

  // reset the transaction
  reset() {
    this.redeemForm.reset();
    this.initRedeemForm();
    this.ngOnInit();
    // this.isSave = true;
    // start condition to enable the discount field and focus if the discount is availlable
    this.setComputation();
    if (
      this.countYYMMDD.days === 0 ||
      (this.countYYMMDD.days <= 4 &&
        this.redeemForm.controls.status.value == 'Matured' &&
        this.countYYMMDD.months === 0 &&
        this.countYYMMDD.years === 0)
    ) {
      this.isReadOnlyDiscount = false;
    }
    // end condition to enable the discount field and focus if the discount is availlable
    this.isReadOnlyDiscount = this.isDiscount
  }

  home() {
    this.router.navigateByUrl('main/dashboard');
  }

  //set value of interest, penalty and due amount during the value changes of discount
  computeDiscount() {
    /* take value of discount to be used in computation of th discount */
    let discountNumber = this.computationService.stringToNumber(
      this.redeemForm.controls.discount.value
    );
    /* start discount to zero if lessthan 0 and 0 if morethan 4 */
    if (discountNumber < 0) this.redeemForm.controls.discount.setValue(0);
    if (discountNumber >= 4) this.redeemForm.controls.discount.setValue(0);
    /* end discount to zero if lessthan 0 and 0 if morethan 4 */

    /* setting discount number to 0 to before parsing to computation */
    if (discountNumber < 0 || discountNumber > 3) discountNumber = 0;

    /* start computation for interest here */
    const _discountInterest = this.computationService.getDiscountInterest(
      this.principalLoan,
      this.interestRate,
      this.computationService.stringToNumber(discountNumber)
    );
    const _interest = this.interest;
    //set value of interest
    this.redeemForm.controls.interest.setValue(_interest - _discountInterest);
    /* end computation for interest here */
    const _penalty = this.computationService.getDiscountPenalty(
      this.principalLoan,
      this.countYYMMDD,
      this.computationService.stringToNumber(discountNumber)
    );
    //set value for penalty
    this.redeemForm.controls.penalty.setValue(_penalty);
    this.dueAmount =
      this.computationService.stringToNumber(
        this.redeemForm.controls.interest.value
      ) +
      this.computationService.stringToNumber(
        this.redeemForm.controls.penalty.value
      );
    //set value for due amoutn
    this.redeemForm.controls.dueAmount.setValue(this.dueAmount);

    const _dueAmount = this.computationService.stringToNumber(
      this.redeemForm.controls.dueAmount.value
    );
    const _serviceCharge = this.computationService.stringToNumber(
      this.redeemForm.controls.serviceCharge.value
    );

    this.redeemForm.controls.redeemAmount.setValue(
      _dueAmount + _serviceCharge + this.principalLoan
    );
  }

  /*  set to disable the discount if focus already in additional amount */
  focusRedeemAmountDisabledDiscount() {
    this.isReadOnlyDiscount = true;
  }

  setComputation() {
    /* set interest value use for global */
    this.interestRate = this.computationService.stringToNumber(
      this.transactionInfo.interestRate
    );

    this.principalLoan = this.transactionInfo.principalLoan;
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

    this.dueAmount = this.interest + this.penalty;
    this.serviceCharge = this.computationService.getServiceCharge(
      this.principalLoan
    );

    this.redeemAmount =
      this.principalLoan + this.dueAmount;

    this.redeemForm.controls.dateTransaction.setValue(new Date());
    this.redeemForm.controls.loanStatus.setValue(this.dateStatus.status());
    this.redeemForm.controls.moments.setValue(
      `Years: ${this.countYYMMDD.years} Months: ${this.countYYMMDD.months} Days: ${this.countYYMMDD.days}`
    );

    this.redeemForm.controls.totalAppraisal.setValue(
      this.transactionInfo.totalAppraisal
    );
    this.redeemForm.controls.principalLoan.setValue(
      this.transactionInfo.principalLoan
    );
    this.redeemForm.controls.interestRate.setValue(
      `${this.transactionInfo.interestRate}%`
    );
    this.redeemForm.controls.change.setValue(0);
    this.redeemForm.controls.interest.setValue(this.interest);
    this.redeemForm.controls.penalty.setValue(this.penalty);
    this.redeemForm.controls.dueAmount.setValue(this.dueAmount);
    this.redeemForm.controls.discount.setValue('');
    this.redeemForm.controls.serviceCharge.setValue(this.serviceCharge);
    this.redeemForm.controls.redeemAmount.setValue(this.redeemAmount);
    this.redeemForm.controls.receivedAmount.setValue('');

    //set paginator and set cursor focus during init, disable discount field if not eligible for disount
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.isDiscount = this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMatured)
      );
      if (!this.isDiscount) this.discountRef.nativeElement.focus();
      if (this.isDiscount) this.receivedAmountRef.nativeElement.focus();
    }, 100);
  }

  initRedeemForm() {
    this.redeemForm = this.fb.group({
      previousTransactionId: [this.transactionInfo.transactionsId], //used to search and mark close the previous number
      trackingId: [this.transactionInfo.trackingId],
      dateTransaction: [new Date()],
      dateGranted: [null],
      dateMatured: [null],
      dateExpired: [null],
      transactionType: [TransactionType.Redeem],
      loanStatus: [this.dateStatus.status()],
      status: [TransactionStatus.Closed],
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
      addtionalAmount: [0], //for additional only
      receivedAmount: [0],
      change: [0],
    });
  }
}

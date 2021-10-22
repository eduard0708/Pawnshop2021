import { HttpClient } from '@angular/common/http';
import { collectExternalReferences } from '@angular/compiler';
import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['../_sass/shared-transaction.scss'],
})
export class AdditionalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('receivedAmountRef') receivedAmountRef: ElementRef;
  @ViewChild('discountRef') discountRef: ElementRef;
  @ViewChild('additionalAmountRef') additionalAmountRef: ElementRef;
  @ViewChild('totalAppraisalRef') totalAppraisalRef: ElementRef;

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
  isReadOnlyDiscount = false;
  isSave = true;
  previousAppriasalValue: number;

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
    private pawnerService: PawnerService,
    private notifierService: NotifierService
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

    this.initAdditionalForm();

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

    //get the total days in moments
    this.totalDays = this.computationService.getTotalDays(
      this.countYYMMDD.days,
      this.countYYMMDD.months,
      this.countYYMMDD.years
    );
    //intialize all computation fields during initialization
    this.setComputation();
  }
  /* validate the value of netproceed and the additional amount before activating the save button */
  ngDoCheck(): void {
    let _netProceed = this.additionalForm.controls.netProceed.value;
    let _additionalAmount = this.additionalForm.controls.additionalAmount.value;
    if (
      this.computationService.stringToNumber(_additionalAmount) > 0 &&
      this.computationService.stringToNumber(_netProceed) > 0
    ) {
      this.isSave = false;
    } else {
      this.isSave = true;
    }
  }
  setDate() {
    const _transactionDate = new Date();
    const _maturedDate = new Date(_transactionDate).setMonth(
      new Date(_transactionDate).getMonth() + 1
    );
    const _expiredDate = new Date(_transactionDate).setMonth(
      new Date(_transactionDate).getMonth() + 4
    );
    this.additionalForm.controls.dateTransaction.setValue(
      new Date(_transactionDate)
    );
    this.additionalForm.controls.dateGranted.setValue(
      new Date(_transactionDate)
    );
    this.additionalForm.controls.dateMatured.setValue(new Date(_maturedDate));
    this.additionalForm.controls.dateExpired.setValue(new Date(_expiredDate));
  }

  appraisalValueAdditional(){
    const _principalLoan = this.computationService.stringToNumber(this.additionalForm.controls.principalLoan.value)
    const _apprailsalValue = this.computationService.stringToNumber(this.additionalForm.controls.totalAppraisal.value)
    this.additionalForm.controls.availlableAmount.setValue(_apprailsalValue - _principalLoan)
  }

  save() {
    const _netProceed = this.computationService.stringToNumber(
      this.additionalForm.controls.netProceed.value
    );
    if (_netProceed < 0)
      this.notifierService.info('Net Proceed must not be lessthan zero.');

    this.additionalForm.controls.principalLoan.setValue(
      this.computationService.stringToNumber(
        this.additionalForm.controls.newPrincipalLoan.value
      )
    );

    this.transactionService.normalizedTransactionInformation(
      this.additionalForm.value,
      this.transactionInfo.transactionPawner,
      this.transactionInfo.transactionItems
    );
  }
  // reset the transaction
  reset() {
    this.additionalForm.reset();
    this.initAdditionalForm();
    this.ngOnInit();
    this.setDate();
    // start condition to enable the discount field and focus if the discount is availlable
    this.setComputation();

    if (
      this.countYYMMDD.days === 0 ||
      (this.countYYMMDD.days <= 4 &&
        this.additionalForm.controls.status.value == 'Matured' &&
        this.countYYMMDD.months === 0 &&
        this.countYYMMDD.years === 0)
    ) {
      this.isReadOnlyDiscount = false;
    }
    // end condition to enable the discount field and focus if the discount is availlable

    this.isReadOnlyDiscount = this.isDiscount

  }
  //go to dashboard if cancel the transaction
  home() {
    this.router.navigateByUrl('main/dashboard');
  }
  /*  set to readOnly the discount if focus already in additional amount */
  focusPartialAmountReadOnlyDiscount() {
    this.isReadOnlyDiscount = true;
  }
  //set value of interest, penalty and due amount during the value changes of discount
  computeDiscount() {
    /* take value of discount to be used in computation of th discount */
    let discountNumber = this.computationService.stringToNumber(
      this.additionalForm.controls.discount.value
    );
    /* start discount to zero if lessthan 0 and 0 if morethan 4 */
    if (discountNumber < 0) this.additionalForm.controls.discount.setValue(0);
    if (discountNumber >= 4) this.additionalForm.controls.discount.setValue(0);
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
    this.additionalForm.controls.interest.setValue(
      _interest - _discountInterest < 0 ? 0 : _interest - _discountInterest
    );

    /* end computation for interest here */
    const _penalty = this.computationService.getDiscountPenalty(
      this.principalLoan,
      this.countYYMMDD,
      this.computationService.stringToNumber(discountNumber)
    );
    //set value for penalty
    this.additionalForm.controls.penalty.setValue(_penalty);
    this.dueAmount =
      this.computationService.stringToNumber(
        this.additionalForm.controls.interest.value
      ) +
      this.computationService.stringToNumber(
        this.additionalForm.controls.penalty.value
      );
    //set value for due amoutn
    this.additionalForm.controls.dueAmount.setValue(this.dueAmount);

  /* this set the discount set the penalty and interest to zero to avoid abnormal key up of discount if readonly
    the penalty have value even the discount is readonly if the discount got focus
  */
    if(this.isReadOnlyDiscount){
      this.additionalForm.controls.penalty.setValue(0)
      this.additionalForm.controls.interest.setValue(0)
    }

  }

  /* set value computation during input of the additonal amount */
  additionalAmountCompute() {
    /* take additionalAmount amount during additional amount value changes */
    const _additionalAmount = this.computationService.stringToNumber(
      this.additionalForm.controls.additionalAmount.value
    );
    /* take availlableAmount amount during additional amount value changes */
    const _availlableAmount = this.computationService.stringToNumber(
      this.additionalForm.controls.availlableAmount.value
    );
    /* take advanceServiceCharge amount during additional amount value changes */
    const _advanceServiceCharge = this.computationService.getServiceCharge(
      this.computationService.stringToNumber(_additionalAmount)
    );
    /* take advanceInterest amount during additional amount value changes */
    const _advanceInterest = this.computationService.getAdvanceInterest(
      this.computationService.stringToNumber(
        this.additionalForm.controls.additionalAmount.value
      ),
      this.interestRate
    );

    /* set additional amount not morethan availlable amount during additional amount value changes */
    if (
      this.computationService.stringToNumber(_additionalAmount) >
      _availlableAmount
    ) {
      this.additionalForm.controls.additionalAmount.setValue(_availlableAmount);

    }

    /* set advanceServiceCharge proceed during value changes in additional amount */
    this.additionalForm.controls.advanceServiceCharge.setValue(
      _advanceServiceCharge
    );

    /* set advanceInterest  proceed during value changes in additional amount */
    this.additionalForm.controls.advanceInterest.setValue(_advanceInterest);

    /* set net proceed during value changes in additional amount */
    this.additionalForm.controls.netProceed.setValue(
      this.computationService.stringToNumber(
        this.additionalForm.controls.additionalAmount.value
      ) -
        this.computationService.stringToNumber(
          this.additionalForm.controls.advanceInterest.value
        ) -
        this.computationService.stringToNumber(
          this.additionalForm.controls.advanceServiceCharge.value
        ) -
        this.computationService.stringToNumber(
          this.additionalForm.controls.dueAmount.value
        )
    );

    this.additionalForm.controls.newPrincipalLoan.setValue(
      _additionalAmount + this.principalLoan
    );

  }
  /*  set to disable the discount if focus already in additional amount */
  focusAdditional() {
    this.isReadOnlyDiscount = true;
  }
  /* load all computation field during initialization and use for reset also */
  setComputation() {
    /* set interest value use for global */
    this.previousAppriasalValue = this.transactionInfo.totalAppraisal;

    this.interestRate = this.computationService.stringToNumber(
      this.transactionInfo.interestRate
    );
    /* set principal loan value use for global */
    this.principalLoan = this.computationService.stringToNumber(
      this.transactionInfo.principalLoan
    );
    // set discount readOnly if preMature
    if (
      this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMatured)
      )
    ) {
      this.additionalForm.controls.discount.setValue(0);
      this.isReadOnlyDiscount = true;
    }

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
    /* set availlable amount  value use for global */
    this.availlableAmount =
      this.transactionInfo.totalAppraisal - this.transactionInfo.principalLoan;

    /* set net payment value use for global */
    this.netPayment =
      +this.dueAmount + this.advanceServiceCharge + this.advanceInterest;

    this.additionalForm.controls.dateTransaction.setValue(new Date());
    this.additionalForm.controls.moments.setValue(
      `Years: ${this.countYYMMDD.years} Months: ${this.countYYMMDD.months} Days: ${this.countYYMMDD.days}`
    );
    // this.additionalForm.controls.totalAppraisal.setValue(
    //   this.transactionInfo.totalAppraisal
    // );
    this.additionalForm.controls.totalAppraisal.setValue('');

    this.additionalForm.controls.principalLoan.setValue(
      this.transactionInfo.principalLoan
    );
    this.additionalForm.controls.interestRate.setValue(
      `${this.transactionInfo.interestRate}%`
    );
    this.additionalForm.controls.interest.setValue(this.interest);
    this.additionalForm.controls.penalty.setValue(this.penalty);
    this.additionalForm.controls.dueAmount.setValue(this.dueAmount);
    this.additionalForm.controls.discount.setValue('');
    this.additionalForm.controls.advanceInterest.setValue(0);
    this.additionalForm.controls.advanceServiceCharge.setValue(0);
    this.additionalForm.controls.availlableAmount.setValue(
      this.availlableAmount
    );
    this.additionalForm.controls.additionalAmount.setValue('');

    /* set paginator and set cursor focus during init */
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.validateIfisDiscount();
    }, 100);
  }

  initAdditionalForm() {
    this.additionalForm = this.fb.group({
      previousTransactionId: [this.transactionInfo.transactionsId], //used to search and mark close the previous number
      trackingId: [this.transactionInfo.trackingId],
      dateTransaction: [],
      dateGranted: [],
      dateMatured: [],
      dateExpired: [],
      transactionType: [TransactionType.Additional],
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
      newPrincipalLoan: [0], // for partial
      receivedAmount: [0],
      change: [0],
    });
    this.setDate();
  }

  validateIfisDiscount(){
    this.isDiscount = this.computationService.isDiscount(
      new Date(this.transactionInfo.dateMatured)
    );
    // console.log( this.isDiscount);

    if (!this.isDiscount) this.discountRef.nativeElement.focus();
    if (this.isDiscount) this.additionalAmountRef.nativeElement.focus();
  }

}

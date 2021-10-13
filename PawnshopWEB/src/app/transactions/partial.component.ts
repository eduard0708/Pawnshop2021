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
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-partial',
  templateUrl: './partial.component.html',
  styleUrls: ['../_sass/shared-transaction.scss'],
})
export class PartialComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('receivedAmountRef') receivedAmountRef: ElementRef;
  @ViewChild('discountRef') discountRef: ElementRef;
  @ViewChild('partialAmountRef') partialAmountRef: ElementRef;
  transactionInfo: NewTransaction = {} as NewTransaction;
  items: Item[] = [];
  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  partialForm: FormGroup;
  moments;

  principalLoan: number;
  daysCount: number;
  interest: number;
  penalty: number;
  interestRate: number;
  dueAmount: number;
  serviceCharge: number;
  advanceInterest: number;
  advanceServiceCharge: number;
  netPayment: number;
  netPayable: number;
  totalDays: number;
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

    this.partialForm = fb.group({
      dateTransaction: [''],
      dateGranted: [],
      dateMatured: [],
      dateExpired: [],
      totalAppraisal: [0],
      principalLoan: [0],
      interestRate: [0],
      interest: [0],
      advanceInterest: [0],
      advanceServiceCharge: [0],
      netPayable: [0],
      penalty: [0],
      dueAmount: [0],
      serviceCharge: [0],
      discount: [0, [Validators.min(0), Validators.max(3)]],
      partialAmount: [0],
      receivedAmount: [0],
      change: [0],
      transaction: [0],
      totalDays: [0],
      totalMonths: [0],
      totalYears: [0],
      status: [0],
      moments: [0],
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

    this.dateStatus = new DateHelper(
      new Date(this.transactionInfo.dateTransaction),
      new Date(this.transactionInfo.dateMatured),
      new Date(this.transactionInfo.dateExpired)
    );

    //get the total number of years, months and days
    this.countYYMMDD = this.dateStatus.getmoments(
      new Date(this.transactionInfo.dateMatured)
    );

    //set chane during amount received change value
    this.partialForm.controls.receivedAmount.valueChanges.subscribe(
      (amountReceived) => {
        const _partialAmount = this.computationService.stringToNumber(
          this.partialForm.controls.partialAmount.value
        );
        let _recivedAmount =
          this.computationService.stringToNumber(amountReceived);

        this.partialForm.controls.change.setValue(
          _recivedAmount - _partialAmount
        );
      }
    );

    //intialize all computation fields during initialization
    this.setComputation();
  }

  save() {
    const amountReceived = this.computationService.stringToNumber(
      this.partialForm.controls.receivedAmount.value
    );
    const redeemAmount = this.computationService.stringToNumber(
      this.partialForm.controls.redeemAmount.value
    );

    if (redeemAmount > amountReceived) {
      this.partialForm.controls.receivedAmount.setValue('');
      this.receivedAmountRef.nativeElement.focus();
      alert('Enter valid amount received');
    }
  }

  // reset the transaction
  reset() {
    this.partialForm.reset();
    this.setComputation();
    // start condition to enable the discount field and focus if the discount is availlable
    this.setComputation();
    if (
      this.countYYMMDD.days === 0 ||
      (this.countYYMMDD.days <= 4 &&
        this.partialForm.controls.status.value == 'Matured' &&
        this.countYYMMDD.months === 0 &&
        this.countYYMMDD.years === 0)
    ) {
      this.partialForm.controls.discount.enable();
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
      this.partialForm.controls.discount.value
    );
    /* start discount to zero if lessthan 0 and 0 if morethan 4 */
    if (discountNumber < 0) this.partialForm.controls.discount.setValue(0);
    if (discountNumber >= 4) this.partialForm.controls.discount.setValue(0);
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
    this.partialForm.controls.interest.setValue(_interest - _discountInterest);
    /* end computation for interest here */
    const _penalty = this.computationService.getDiscountPenalty(
      this.principalLoan,
      this.countYYMMDD,
      this.computationService.stringToNumber(discountNumber)
    );
    //set value for penalty
    this.partialForm.controls.penalty.setValue(_penalty);
    this.dueAmount =
      this.computationService.stringToNumber(
        this.partialForm.controls.interest.value
      ) +
      this.computationService.stringToNumber(
        this.partialForm.controls.penalty.value
      );
    //set value of net dueAmount during discount value changes
    this.partialForm.controls.dueAmount.setValue(this.dueAmount);

    //set value of netPayable during discount value changes
    this.partialForm.controls.netPayable.setValue(
      this.principalLoan +
        this.computationService.stringToNumber(
          this.partialForm.controls.dueAmount.value
        ) +
        this.computationService.stringToNumber(
          this.partialForm.controls.advanceInterest.value
        ) +
        this.computationService.stringToNumber(
          this.partialForm.controls.advanceServiceCharge.value
        )
    );
  }
  //validate partial amount will not exceed in net payable amount
  validatePartialAmount() {
    const _netPayableAmount = this.computationService.stringToNumber(
      this.partialForm.controls.netPayable.value
    );

    const _partialAmount = this.computationService.stringToNumber(
      this.partialForm.controls.partialAmount.value
    );

    if (_partialAmount > _netPayableAmount)
      this.partialForm.controls.partialAmount.setValue(_netPayableAmount);
  }

  /*  set to disable the discount if focus already in additional amount */
  focusPartialAmountDisabledDiscount() {
    this.partialForm.controls.discount.disable();
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

    // set discount disabled
    if (
      this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMatured)
      )
    ) {
      this.partialForm.controls.discount.setValue(0);
      this.partialForm.controls.discount.disable();
    }

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
    this.advanceInterest = this.computationService.getAdvanceInterest(
      this.transactionInfo.principalLoan,
      this.transactionInfo.interestRate
    );
    this.advanceServiceCharge = this.computationService.getAdvanceServiceCharge(
      this.transactionInfo.principalLoan
    );
    this.netPayable =
      this.principalLoan +
      this.dueAmount +
      this.advanceInterest +
      this.advanceServiceCharge;

    this.partialForm.controls.dateTransaction.setValue(new Date());
    this.partialForm.controls.status.setValue(this.dateStatus.status());
    this.partialForm.controls.moments.setValue(
      `Years: ${this.countYYMMDD.years} Months: ${this.countYYMMDD.months} Days: ${this.countYYMMDD.days}`
    );
    this.partialForm.controls.totalAppraisal.setValue(
      this.transactionInfo.totalAppraisal
    );

    this.partialForm.controls.principalLoan.setValue(
      this.transactionInfo.principalLoan
    );
    this.partialForm.controls.interestRate.setValue(
      `${this.transactionInfo.interestRate}%`
    );
    this.partialForm.controls.change.setValue(0);
    this.partialForm.controls.interest.setValue(this.interest);
    this.partialForm.controls.penalty.setValue(this.penalty);
    this.partialForm.controls.dueAmount.setValue(this.dueAmount);
    this.partialForm.controls.discount.setValue('');
    this.partialForm.controls.advanceInterest.setValue(this.advanceInterest);
    this.partialForm.controls.advanceServiceCharge.setValue(
      this.advanceServiceCharge
    );
    this.partialForm.controls.netPayable.setValue(this.netPayable);
    this.partialForm.controls.partialAmount.setValue('');
    this.partialForm.controls.receivedAmount.setValue('');

    //set paginator and set cursor focus during init
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.isDiscount = this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMatured)
      );

      if (!this.isDiscount) this.discountRef.nativeElement.focus();
      if (this.isDiscount) this.partialAmountRef.nativeElement.focus();
    }, 100);
  }
}

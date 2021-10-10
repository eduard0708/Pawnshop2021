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
import { NewTransaction } from '../_model/transaction/new-transaction';
import { ComputationService } from '../_service/computation.service';
import { RedeemService } from '../_service/redeem.service';
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
  @ViewChild('partialRef') redeemRef: ElementRef;
  transactionInfo: NewTransaction = {} as NewTransaction;
  items: Item[] = [];
  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  partialForm: FormGroup;
  moments;

  principalLoan: number;
  daysCount: number;
  interest: number;
  penalty: number;
  dueAmount: number;
  serviceCharge: number;
  advanceInterest: number;
  advanceServiceCharge: number;
  netPayment: number;
  partialAmount: number;
  totalDays: number;
  isDiscount: boolean;

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
    private transactionService: TransactionService,
    private computationService: ComputationService
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
      console.log(this.transactionInfo);
    });

    let dateStatus = new DateHelper(
      new Date(this.transactionInfo.dateTransaction),
      new Date(this.transactionInfo.dateMature),
      new Date(this.transactionInfo.dateExpire)
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
      netPayment: [0],
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

  //set focus to discount during init if not disabled
    setTimeout(() => {
      if (this.partialForm.controls.discount.untouched) {
        this.setComputation();
      }
    }, 100);

    this.partialForm.controls.discount.valueChanges.subscribe((discount) => {
      let afterDiscount = this.computationService.stringToNumber(discount);
      const partialAmount = this.partialAmount;

      this.partialForm.controls.netPayment.setValue(
        partialAmount - afterDiscount
      );
      this.partialForm.controls.receivedAmount.setValue(0);
      this.partialForm.controls.change.setValue(0);

      if (afterDiscount > partialAmount)
        this.partialForm.controls.discount.setValue(partialAmount);
    });

    this.partialForm.controls.receivedAmount.valueChanges.subscribe(
      (amountReceived) => {
        const redeemAmount = this.computationService.stringToNumber(
          this.partialForm.controls.partialAmount.value
        );
        let recivedAmount =
          this.computationService.stringToNumber(amountReceived);
        let change =
          redeemAmount > recivedAmount ? 0 : recivedAmount - redeemAmount;
        this.partialForm.controls.change.setValue(change ?? 0);
      }
    );
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

  reset() {
    this.partialForm.reset();
    this.setComputation();
    this.receivedAmountRef.nativeElement.focus();
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
    let dateStatus = new DateHelper(
      new Date(this.transactionInfo.dateTransaction),
      new Date(this.transactionInfo.dateMature),
      new Date(this.transactionInfo.dateExpire)
    );

    //get the total number of years, months and days
    let countYYMMDD = dateStatus.getmoments(
      new Date(this.transactionInfo.dateMature)
    );
    //get the total days in moments
    this.totalDays = this.computationService.getTotalDays(
      countYYMMDD.days,
      countYYMMDD.months,
      countYYMMDD.years
    );

    this.principalLoan = this.transactionInfo.principalLoan;
    this.daysCount = this.computationService.getTotalDays(
      countYYMMDD.days,
      countYYMMDD.months,
      countYYMMDD.years
    );

    // set discount disabled
   if (
      this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMature)
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
    this.penalty = this.computationService.getPenalty(
      this.principalLoan,
      this.totalDays
    );
    this.dueAmount = this.interest + this.penalty;
    this.serviceCharge = this.computationService.getServiceCharge(
      this.principalLoan
    );
    this.advanceInterest = this.computationService.getAdvanceInterest(this.transactionInfo.principalLoan, this.transactionInfo.interestRate)
    this.advanceServiceCharge = this.computationService.getAdvanceServiceCharge(this.transactionInfo.principalLoan)
    this.partialAmount =
      this.principalLoan + this.dueAmount + this.serviceCharge;

    this.partialForm.controls.dateTransaction.setValue(new Date());
    this.partialForm.controls.status.setValue(dateStatus.status());
    this.partialForm.controls.moments.setValue(
      `Years: ${countYYMMDD.years} Months: ${countYYMMDD.months} Days: ${countYYMMDD.days}`
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
    this.partialForm.controls.advanceServiceCharge.setValue(this.advanceServiceCharge);
    this.partialForm.controls.netPayment.setValue(this.partialAmount);
    this.partialForm.controls.receivedAmount.setValue('');

    //set paginator and set cursor focus during init
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.isDiscount = this.computationService.isDiscount(
        new Date(this.transactionInfo.dateMature)
      );

      if (!this.isDiscount) this.discountRef.nativeElement.focus();
      if (this.isDiscount) this.receivedAmountRef.nativeElement.focus();
    }, 100);
  }
}

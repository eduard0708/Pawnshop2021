import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['../_sass/shared-transaction.scss'],
})
export class RedeemComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('receivedAmountRef') receivedAmountRef: ElementRef;
  @ViewChild('discountRef') discountRef: ElementRef;
  @ViewChild('redeemRef') redeemRef: ElementRef;
  transactionInfo: NewTransaction = {} as NewTransaction;
  items: Item[] = [];
  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  redeemForm: FormGroup;
  previousTransactionId;
  moments;
  principalLoan: number;
  daysCount: number;
  interest: number;
  penalty: number;
  dueAmount: number;
  serviceCharge: number;
  redeemAmount: number;

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
      }
    });

    this.redeemForm = fb.group({
      dateTransaction: [''],
      dateGranted: [],
      dateMatured: [],
      dateExpired: [],
      totalAppraisal: [0],
      principalLoan: [0],
      interestRate: [0],
      interest: [0],
      penalty: [0],
      dueAmount: [0],
      serviceCharge: [0],
      discount: [0],
      redeemAmount: [0],
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
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.receivedAmountRef.nativeElement.focus();
    }, 100);

    this.redeemForm.controls.receivedAmount.valueChanges.subscribe(
      (amountReceived) => {
        const redeemAmount = this.computationService.stringToNumber(
          this.redeemForm.controls.redeemAmount.value
        );
        let recivedAmount =
          this.computationService.stringToNumber(amountReceived);
        let change =
          redeemAmount > recivedAmount ? 0 : recivedAmount - redeemAmount;
        this.redeemForm.controls.change.setValue(change ?? 0);
      }
    );

    this.redeemForm.controls.discount.valueChanges.subscribe((discount) => {
      let afterDiscount = this.computationService.stringToNumber(discount);
      const redeemAmount = this.redeemAmount;
      this.redeemForm.controls.redeemAmount.setValue(
        redeemAmount - afterDiscount
      );
      this.redeemForm.controls.receivedAmount.setValue(0);
      this.redeemForm.controls.change.setValue(0);

      if (afterDiscount > redeemAmount)
        this.redeemForm.controls.discount.setValue(redeemAmount);
    });

    //convert datatrasactionItems as Items to load in table dataSource
    if (this.transactionInfo.transactionItems.length !== 0)
      this.dataSource.data =
        this.transactionService.normalizeItemsForTable(
          this.transactionInfo.transactionItems
        ) ?? [];

    setTimeout(() => {
      if (this.redeemForm.controls.discount.untouched) {
        this.setComputation();
      }
    }, 100);
  }

  ngAfterViewInit(): void {}

  save() {
    const amountReceived = this.computationService.stringToNumber(
      this.redeemForm.controls.receivedAmount.value
    );
    const redeemAmount = this.computationService.stringToNumber(
      this.redeemForm.controls.redeemAmount.value
    );

    if (redeemAmount > amountReceived){
      this.receivedAmountRef.nativeElement.focus();
      alert("Enter valid amount received")
    }

  }
  reset() {
    this.redeemForm.reset();
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

    let momentsInfo = dateStatus.getDaysMonthsYear(dateStatus.moments());
    let totalDays = this.computationService.getTotalDays(
      momentsInfo.totalDays,
      momentsInfo.totalMonths,
      momentsInfo.totalYears
    );

    this.principalLoan = this.transactionInfo.principalLoan;
    this.daysCount = this.computationService.getTotalDays(
      momentsInfo.totalDays,
      momentsInfo.totalMonths,
      momentsInfo.totalYears
    );
    this.interest = this.computationService.getInterest(
      this.principalLoan,
      this.transactionInfo.interestRate,
      totalDays
    );
    this.penalty = this.computationService.getPenalty(
      this.principalLoan,
      totalDays
    );
    this.dueAmount = this.interest + this.penalty;
    this.serviceCharge = this.computationService.getServiceCharge(
      this.principalLoan
    );
    this.redeemAmount =
      this.principalLoan + this.dueAmount + this.serviceCharge;

    this.redeemForm.controls.dateTransaction.setValue(new Date());
    this.redeemForm.controls.status.setValue(dateStatus.status());
    this.redeemForm.controls.moments.setValue(dateStatus.moments());
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
  }
}

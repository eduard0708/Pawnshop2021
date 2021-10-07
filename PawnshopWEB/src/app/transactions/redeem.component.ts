import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { stringify } from 'querystring';
import { DateHelper } from '../_model/DateHelper';
import { Item } from '../_model/item/item';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { ItemService } from '../_service/item.service';
import { RedeemService } from '../_service/redeem.service';
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['../_sass/shared-transaction.scss'],
})
export class RedeemComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('receivedAmountRef') receivedAmountRef: ElementRef;
  transactionInfo: NewTransaction = {} as NewTransaction;
  items: Item[] = [];
  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  redeemForm: FormGroup;
  previousTransactionId;
  moments;

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
    private transactionService: TransactionService
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
      dueAmount: [0],
      penalty: [0],
      interestRate: [0],
      serviceCharge: [0],
      discount: [0],
      redeemAmount: [0],
      receiveAmount: [0],
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

    this.setComputation();

    //convert datatrasactionItems as Items to load in table dataSource
    if (this.transactionInfo.transactionItems.length !== 0)
      this.dataSource.data =
        this.transactionService.normalizeItemsForTable(
          this.transactionInfo.transactionItems
        ) ?? [];
  }

  save() {}
  reset() {
    this.redeemForm.reset();
    this.setComputation();
    this.receivedAmountRef.nativeElement.focus();
  }

  home() {
    this.router.navigateByUrl('main/dashboard');
  }

  setComputation() {
    let dateStatus = new DateHelper(
      new Date(this.transactionInfo.dateTransaction),
      new Date(this.transactionInfo.dateMature),
      new Date(this.transactionInfo.dateExpire)
    );

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

    let totalDaysMonthsYears = dateStatus.getMomentsInYearMonthDays(
      dateStatus.moments()
    );

    console.log(totalDaysMonthsYears.totalDays);
    console.log(totalDaysMonthsYears.totalMonths);
    console.log(totalDaysMonthsYears.totalYears);

  }
}

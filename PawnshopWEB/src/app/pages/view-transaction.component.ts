import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { BehaviorSubject } from 'rxjs';
import { TransactionType } from '../_enum/enums';
import { Item } from '../_model/item/item';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { TotalYYMMDD } from '../_model/totalYYMMDD';
import { TransactionInformation } from '../_model/transaction/transaction-information';
import { ComputationService } from '../_service/computation.service';
import { PawnerService } from '../_service/pawner.service';
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['../_sass/shared-transaction.scss'],
})
export class ViewTransactionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchRef') searchRef: ElementRef;
  transactionInfo: TransactionInformation = {} as TransactionInformation;
  transactionInfo$ = new BehaviorSubject<TransactionInformation>(
    this.transactionInfo
  );
  items: Item[] = [];
  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  viewForm: FormGroup;

  isInterest = false;
  isPenalty = false;
  isDueAmount = false;
  isDiscounts = false;
  isServiceCharge = false;
  isAdvnterest = false;
  isAdvServiceCharge = false;
  isNetPayable = false;
  isNetProceed = false;
  isAmountReceived = false;
  isChange = false;
  isPartial = false;
  isNewPrincipal = false;
  isAvaillableAmount = false;
  isAdditionalAmount = false;
  isRedeemAmount = false;

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
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private computationService: ComputationService,
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
    this.initViewForm();
    this.dataSource = new MatTableDataSource<Item>();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchRef.nativeElement.focus();
    }, 100);

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

    this.dataSource.data = this.transactionInfo.transactionItems as any;
    this.checkSetDisplay();
  }

  search() {
    this.transactionService
      .searchTransactionById(
        this.computationService.stringToNumber(
          this.viewForm.controls.searchNumber.value
        )
      )
      .subscribe((transaction) => {
        this.transactionInfo = transaction;
        this.initViewForm();
        this.checkSetDisplay();

        /* send data to pawnerService to normalalized asa pawnerInfo Type and send
        to transaction-pawner-info.component to display*/
        const pawner = this.pawnerService.normalizedPawnerInfo(
          this.transactionInfo.transactionPawner,
          this.transactionInfo.dateTransaction,
          this.transactionInfo.dateGranted,
          this.transactionInfo.dateMatured,
          this.transactionInfo.dateExpired
        );
        this.pawnerService.takePawnerInfo(pawner);
      });

    this.viewForm.controls.searchNumber.setValue('');
    this.searchRef.nativeElement.focus();
  }

  home() {
    this.router.navigateByUrl('main/dashboard');
  }
  reset() {
    this.viewForm.controls.searchNumber.setValue('');
    this.searchRef.nativeElement.focus();
  }
  initViewForm() {
    this.viewForm = this.fb.group({
      transactionId: [this.transactionInfo.transactionsId],
      dateTransaction: [new Date(this.transactionInfo.dateTransaction)],
      dateGranted: [this.transactionInfo.dateGranted],
      dateMatured: [this.transactionInfo.dateMatured],
      dateExpired: [this.transactionInfo.dateExpired],
      totalAppraisal: [this.transactionInfo.totalAppraisal],
      principalLoan: [this.transactionInfo.principalLoan],
      interestRate: [this.transactionInfo.interestRate + '%'],
      interest: [this.transactionInfo.interest],
      advanceInterest: [this.transactionInfo.advanceInterest],
      advanceServiceCharge: [this.transactionInfo.advanceServiceCharge],
      netPayable: [this.transactionInfo.netPayment],
      netProceed: [this.transactionInfo.netProceed],
      penalty: [this.transactionInfo.penalty],
      dueAmount: [this.transactionInfo.dueAmount],
      serviceCharge: [this.transactionInfo.serviceCharge],
      discount: [this.transactionInfo.discount],
      partialAmount: [this.transactionInfo.partialAmount],
      newPrincipal: [this.principalLoan],
      redeemAmount: [this.transactionInfo.redeemAmount],
      receivedAmount: [this.transactionInfo.receivedAmount],
      availlableAmount: [this.transactionInfo.availlableAmount], //for additional only
      additionalAmount: [this.transactionInfo.additionalAmount], //for additional only
      newPrincipalLoan: [this.transactionInfo.newPrincipalLoan], // for partial
      change: [this.transactionInfo.change],
      status: [this.transactionInfo.status],
      moments: [this.transactionInfo.moments],
      searchNumber: [''],
    });
  }
  checkSetDisplay() {
    if (this.transactionInfo.transactionType === TransactionType.Newloan) {
      this.initDisplay();
      this.newloanDisplay();
    }
    if (this.transactionInfo.transactionType === TransactionType.Redeem) {
      this.initDisplay();
      this.redeemDisplay();
    }
    if (this.transactionInfo.transactionType === TransactionType.Partial) {
      this.initDisplay();
      this.partialDisplay();
    }
    if (this.transactionInfo.transactionType === TransactionType.Additional) {
      this.initDisplay();
      this.additionalDisplay();
    }
    if (this.transactionInfo.transactionType === TransactionType.Renew) {
      this.initDisplay();
      this.renewDispaly();
    }
  }
  newloanDisplay() {
    this.isAdvServiceCharge = true;
    this.isAdvnterest = true;
    this.isNetProceed = true;
  }
  redeemDisplay() {
    this.isInterest = true;
    this.isPenalty = true;
    this.isDueAmount = true;
    this.isDiscounts = true;
    this.isServiceCharge = true;
    this.isAmountReceived = true;
    this.isRedeemAmount = true;
    this.isChange = true;
  }
  partialDisplay() {
    /* to take the old principal loan is to add the principalLoan and the partial amount*/
    const _newPrincipalLoan = this.computationService.stringToNumber(
      this.viewForm.controls.principalLoan.value
    );
    const _partialAmount = this.computationService.stringToNumber(
      this.viewForm.controls.partialAmount.value
    );
    const _advanceInterest = this.computationService.stringToNumber(
      this.viewForm.controls.advanceInterest.value
    );
    const _advanceServiceCharge = this.computationService.stringToNumber(
      this.viewForm.controls.advanceServiceCharge.value
    );
    const _dueAmount = this.computationService.stringToNumber(
      this.viewForm.controls.dueAmount.value
    );
    /* calculation to restore the old principalLoan for viewing purpose only */
    this.viewForm.controls.principalLoan.setValue(
      _newPrincipalLoan +
        _partialAmount -
        (_advanceInterest + _advanceServiceCharge + _dueAmount)
    );
    this.isInterest = true;
    this.isPenalty = true;
    this.isDiscounts = true;
    this.isDueAmount = true;
    this.isNetPayable = true;
    this.isPartial = true;
    this.isAdvnterest = true;
    this.isAdvServiceCharge = true;
    this.isNewPrincipal = true;
    this.isAmountReceived = true;
    this.isChange = true;
  }
  additionalDisplay() {
    const _newPrincipalLoan = this.computationService.stringToNumber(
      this.viewForm.controls.principalLoan.value
    );
    const _additionalAmount = this.computationService.stringToNumber(
      this.viewForm.controls.additionalAmount.value
    );
    /* set old value of principal loan to be displayed */
    this.viewForm.controls.principalLoan.setValue(
      _newPrincipalLoan - _additionalAmount
    );

    this.isInterest = true;
    this.isPenalty = true;
    this.isDueAmount = true;
    this.isDiscounts = true;
    this.isServiceCharge = true;
    this.isAvaillableAmount = true;
    this.isAdditionalAmount = true;
    this.isAdvnterest = true;
    this.isAdvServiceCharge = true;
    this.isNewPrincipal = true;
    this.isNetProceed = true;
  }
  renewDispaly() {
    this.isInterest = true;
    this.isPenalty = true;
    this.isDueAmount = true;
    this.isDiscounts = true;
    this.isServiceCharge = true;
    this.isAdvnterest = true;
    this.isAdvServiceCharge = true;
    this.isNetPayable = true;
    this.isAmountReceived = true;
    this.isChange = true;
  }

  initDisplay() {
    this.isInterest = false;
    this.isPenalty = false;
    this.isDueAmount = false;
    this.isDiscounts = false;
    this.isServiceCharge = false;
    this.isAdvnterest = false;
    this.isAdvServiceCharge = false;
    this.isNetPayable = false;
    this.isNetProceed = false;
    this.isAmountReceived = false;
    this.isChange = false;
    this.isPartial = false;
    this.isRedeemAmount = false;
    this.isNewPrincipal = false;
  }
}

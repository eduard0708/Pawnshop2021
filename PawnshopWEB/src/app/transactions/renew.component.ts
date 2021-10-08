import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['../_sass/shared-transaction.scss']
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

  principalLoan: number;
  daysCount: number;
  interest: number;
  penalty: number;
  dueAmount: number;
  advanceInterest: number;
  advanceServiceCharge: number;
  netPayment: number;

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
    private computationService:ComputationService
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

    let dateStatus = new DateHelper(
      new Date(this.transactionInfo.dateTransaction),
      new Date(this.transactionInfo.dateMature),
      new Date(this.transactionInfo.dateExpire)
    );

    this.renewForm = fb.group({
      redeemAmount: [],
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
      receivedAmount: [0],
      change: [0],
      status: [dateStatus.status()],
      moments:[dateStatus.moments()],

    });

    this.dataSource = new MatTableDataSource<Item>();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.receivedAmountRef.nativeElement.focus();
    }, 100);

      let items: Item[]=[];

    for (let index = 0; index < this.transactionInfo.transactionItems.length; index++) {
      const item = this.transactionInfo.transactionItems[index];
        let nItem:Item = {
          itemId: item.itemId,
          categoryId:0,
          category:item.category,
          categoryDescription:item.categoryDescription,
          description:item.itemDescription,
          appraisalValue:item.appraisalValue
        }
        items.push(nItem);
    }

    this.dataSource.data = items;

    this.renewForm.controls.receivedAmount.valueChanges.subscribe(
      (amountReceived) => {
        const netPayment = this.computationService.stringToNumber(
          this.renewForm.controls.netPayment.value
        );
        let recivedAmount =
          this.computationService.stringToNumber(amountReceived);
        let change =
        netPayment > recivedAmount ? 0 : recivedAmount - netPayment;
        this.renewForm.controls.change.setValue(change ?? 0);
      }
    );

    this.renewForm.controls.discount.valueChanges.subscribe((discount) => {
      let afterDiscount = this.computationService.stringToNumber(discount);
      const netPayment = this.netPayment;
      this.renewForm.controls.netPayment.setValue(
        netPayment - afterDiscount
      );
      this.renewForm.controls.receivedAmount.setValue(0);
      this.renewForm.controls.change.setValue(0);

      if (afterDiscount > netPayment)
        this.renewForm.controls.discount.setValue(netPayment);
    });



    setTimeout(() => {
      if (this.renewForm.controls.discount.untouched) {
        this.setComputation();
      }
    }, 100);


  }

  save() {
    const amountReceived = this.computationService.stringToNumber(
      this.renewForm.controls.receivedAmount.value
    );
    const netPayment = this.computationService.stringToNumber(
      this.renewForm.controls.netPayment.value
    );

    if (netPayment > amountReceived){
      this.renewForm.controls.receivedAmount.setValue('');
      this.receivedAmountRef.nativeElement.focus();
      alert("Enter valid amount received")
    }

  }


  reset() {
    this.renewForm.reset();
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

    this.advanceInterest = this.computationService.getAdvanceInterest(
      this.principalLoan,
      this.transactionInfo.interestRate,
    );
    this.dueAmount = this.interest + this.penalty;
    this.advanceServiceCharge = this.computationService.getServiceCharge(
      this.principalLoan
    );

    this.netPayment =+ this.dueAmount + this.advanceServiceCharge + this.advanceInterest;

    this.renewForm.controls.dateTransaction.setValue(new Date());
    this.renewForm.controls.status.setValue(dateStatus.status());
    this.renewForm.controls.moments.setValue(dateStatus.moments());
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
    this.renewForm.controls.advanceServiceCharge.setValue(this.advanceServiceCharge);
    this.renewForm.controls.netPayment.setValue(this.netPayment);
    this.renewForm.controls.receivedAmount.setValue('');
  }
}

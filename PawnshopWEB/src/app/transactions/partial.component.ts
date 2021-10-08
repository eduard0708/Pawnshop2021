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
  selector: 'app-partial',
  templateUrl: './partial.component.html',
  styleUrls: ['../_sass/shared-transaction.scss']
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
  netPayment:number;
  partialAmount: number;



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
      discount: [0],
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

    // console.log(new Date(this.partialForm.controls.dateTransaction.value));
    this.partialForm.valueChanges.subscribe(() => {
      let dt = new Date(new Date(this.partialForm.controls.dateTransaction.value).setHours(0,0,0,0));
      let dg = new Date(
        new Date(this.partialForm.controls.dateGranted.value).setHours(0,0,0,0) );
      let days = (dg.getTime() - dt.getTime()) / (24 * 3600 * 1000);

    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      // this.receivedAmountRef.nativeElement.focus();
    }, 100);


    // this.partialForm.controls.receivedAmount.valueChanges.subscribe(
    //   (amountReceived) => {
    //     const partialPay = this.computationService.stringToNumber(
    //       this.partialForm.controls.partialPay.value
    //     );
    //     let recivedAmount =
    //       this.computationService.stringToNumber(amountReceived);
    //     let change =
    //     partialPay > recivedAmount ? 0 : recivedAmount - partialPay;
    //     this.partialForm.controls.change.setValue(change ?? 0);
    //   }
    // );

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

  }
  save() {
    const amountReceived = this.computationService.stringToNumber(
      this.partialForm.controls.receivedAmount.value
    );
    const redeemAmount = this.computationService.stringToNumber(
      this.partialForm.controls.redeemAmount.value
    );

    if (redeemAmount > amountReceived){
      this.partialForm.controls.receivedAmount.setValue('');
      this.receivedAmountRef.nativeElement.focus();
      alert("Enter valid amount received")
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
    this.partialAmount =
      this.principalLoan + this.dueAmount + this.serviceCharge;

    this.partialForm.controls.dateTransaction.setValue(new Date());
    this.partialForm.controls.status.setValue(dateStatus.status());
    this.partialForm.controls.moments.setValue(dateStatus.moments());
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
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import { environment } from 'src/environments/environment';
import { ItemStatus, LoanStatus, TransactionStatus, TransactionType } from '../_enum/enums';
import { DateHelper } from '../_model/DateHelper';
import { Item } from '../_model/item/item';
import { ItemAuditTrail } from '../_model/item/item-audit-trail';
import { Pawner } from '../_model/pawner/Pawner';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { NewTransactionComputation } from '../_model/transaction/new-transaction-computation';
import { NewTransactionPawner } from '../_model/transaction/new-transaction-pawner';
import { NewTransactionItems } from '../_model/transaction/new-trasaction-items';
import { User } from '../_model/user';
import { ComputationService } from './computation.service';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root',
})

export class NewloanService {
  url = environment.baseUrl
  uri: string = 'http://localhost:3000/';

  constructor(private itemService: ItemService, private http: HttpClient, private router:Router, private computationService:ComputationService) {}

  getAdvanceServiceCharge(principalLoan: number) {
    let advanceInterest = 0;
    if (principalLoan >= 500) {
      advanceInterest = 5;
    } else if (principalLoan >= 400 && principalLoan <= 499) {
      advanceInterest = 4;
    } else if (principalLoan >= 300 && principalLoan <= 399) {
      advanceInterest = 3;
    } else if (principalLoan >= 200 && principalLoan <= 299) {
      advanceInterest = 2;
    } else if (principalLoan >= 1 && principalLoan <= 199) {
      advanceInterest = 1;
    }
    return advanceInterest;
  }

  getTotalAppraisal() {
    let totalAppraisal = 0;
    if (this.itemService.items.length > 0) {
      this.itemService.items.forEach((s) => {
        totalAppraisal =
          +s.appraisalValue.toString().replace(/[^\d.-]/g, '') + totalAppraisal;
      });

    }
    return totalAppraisal;
  }

  getAdvanceInterest(principalLoan: number) {
    return principalLoan * (this.getInterestRate() / 100);
  }

  getInterestRate() {
    if (this.itemService.items.length > 0)
      return this.itemService.items[0].categoryId === 1 ? 3 : 6;

    return 0;
  }

  normalizedNewloanInfo(transaction: NewTransactionComputation, pawner, items) {
    let user: User = JSON.parse(localStorage.getItem('user'));
    let saveItems: NewTransactionItems[] = [];
    //normalize itemAuditTrail value
    let itemAuditTrail: ItemAuditTrail = {
      itemAuditTrailId: 0,
      actionBy: user.id,
      dateOn: new Date().toISOString(),
      itemStatus: ItemStatus.Pawned,
      remarks: null,
    };

    //loop to normalize items value
    for (let index = 0; index < items.length; index++) {
      const item: Item = items[index];

      let initItems: NewTransactionItems = {
        itemId: 0,
        previousTransactionId: 0,
        trackingId: 0,
        category: item.category,
        categoryDescription: item.categoryDescription,
        itemDescription: item.description,
        appraisalValue: item.appraisalValue,
        sellingPrice: 0,
        isSold: false,
        dateSold: null,
        newDateTransaction: new Date().toISOString(),
        itemAuditTrails: [itemAuditTrail],
      };
      saveItems.push(initItems);
    }
    //normalize pawner value
    const savePanwer: NewTransactionPawner = {
      pawnerTransactionId: 0,
      pawnerId: pawner.pawnerId,
      trackingId: 0,
      firstName: pawner.firstName,
      lastName: pawner.lastName,
      contactNumber: pawner.contactNumber,
      city: pawner.city,
      barangay: pawner.barangay,
      completeAddress: pawner.completeAddress,
    };

  //normalize transactions value
  let dateTransaction = new DateHelper(new Date(transaction.dateTransaction));
  let dateGranted = new DateHelper(new Date(transaction.dateGranted));
  let dateMatured = new DateHelper(new Date(transaction.dateMatured));
  let dateExpired = new DateHelper(new Date(transaction.dateExpired));

    const saveTransaction: NewTransaction = {
      transactionsId: 0,
      trackingId: 0,
      dateTransaction: dateTransaction.dateToISOstring(),
      dateGranted:dateGranted.dateToISOstring(),
      dateMatured: dateMatured.dateToISOstring(),
      dateExpired: dateExpired.dateToISOstring(),
      transactionType: TransactionType.Newloan,
      status: TransactionStatus.Active,
      loanStatus: LoanStatus.New,
      discount: 0,
      totalAppraisal: this.computationService.stringToNumber(transaction.totalAppraisal),
      principalLoan:this.computationService.stringToNumber(transaction.principalLoan),
      interestRate:this.computationService.stringToNumber(transaction.interestRate),
      advanceInterest:this.computationService.stringToNumber(transaction.advanceInterest),
      advanceServiceCharge:this.computationService.stringToNumber(transaction.advanceServiceCharge),
      interest:this.computationService.stringToNumber(transaction.interest),
      serviceCharge:this.computationService.stringToNumber(transaction.serviceCharge),
      penalty: 0,
      dueAmount: 0,
      redeemAmount: 0,
      netProceed:this.computationService.stringToNumber(transaction.netProceed),
      netPayment: 0,
      receiveAmount: 0,
      change: 0,
      employeeId: user.id,
      transactionItems: [...saveItems],
      transactionPawner: savePanwer,

    };

    this.addTransaction(saveTransaction)
  }

  addTransaction(saveTransaction){
    this.http.post(this.url + 'transaction', saveTransaction ).subscribe(transaction => {
      this.router.navigateByUrl('invoicetest', {state:{print: transaction}});
      this.itemService.clear();
    });
  }



}

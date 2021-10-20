import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemStatus, TransactionType } from '../_enum/enums';
import { Item } from '../_model/item/item';
import { ItemAuditTrail } from '../_model/item/item-audit-trail';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { DashBoardData } from '../_model/transaction/dashboard-data';
import { TransactionInformation } from '../_model/transaction/transaction-information';
import { TransactionItems } from '../_model/transaction/transaction-items';
import { TransactionPawner } from '../_model/transaction/transaction-pawner';
import { User } from '../_model/user';
import { ComputationService } from './computation.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  saveRedeemInfo: TransactionInformation;
  transactionInfo: TransactionInformation;
  url = environment.baseUrl;

  public dashBoardDataSource = new ReplaySubject<DashBoardData>(1);
  dashBoardDataSource$ = this.dashBoardDataSource.asObservable();

  constructor(
    private computationService: ComputationService,
    private http: HttpClient,
    private router: Router
  ) {}

  /* normalize items from transaction to assigned in table */
  normalizeItemsForTable(items) {
    let normItem: Item[] = [];
    for (let index = 0; index < items.length; index++) {
      const i = items[index];
      let nItem: Item = {
        itemId: i.itemId,
        categoryId: 0,
        category: i.category,
        categoryDescription: i.categoryDescription,
        description: i.categoryDescription,
        appraisalValue: i.appraisalValue,
      };
      normItem.push(nItem);
    }
    return normItem;
  }

  normalizedTransationInfo({
    transactionInfo,
    pawnerInfo,
    itemsInfo,
  }: {
    transactionInfo: TransactionInformation;
    pawnerInfo;
    itemsInfo;
  }) {
    let user: User = JSON.parse(localStorage.getItem('user'));
    let saveItems: TransactionItems[] = [];
    //normalize itemAuditTrail value
    let itemAuditTrail: ItemAuditTrail = {
      itemAuditTrailId: 0,
      actionBy: user.id,
      dateOn: new Date().toISOString(),
      itemStatus: ItemStatus.Pawned,
      remarks: null,
    };
  }

  onSaveTransaction(transactionInfo) {
    this.http
      .post(this.url + 'transaction/addtransaction', transactionInfo)
      .subscribe((transaction) => {
        this.router.navigateByUrl('invoicetest', {
          state: { print: transaction },
        });
      });
    this.updateDashBoardData();
  }

  normalizePawnerInfo(t: any) {
    let items: Item[];

    let pawner = t.transactionPawner;
    let pawnerInfo: PawnerInfo = {
      pawnerId: pawner.pawnerId,
      dateTransaction: new Date(t.dateTransaction),
      dateExpired: new Date(t.dateExpired),
      dateGranted: new Date(t.dateGranted),
      dateMatured: new Date(t.dateMatured),
      firstName: pawner.firstName,
      lastName: pawner.lastName,
      contactNumber: pawner.contactNumber,
      city: pawner.city,
      barangay: pawner.barangay,
      completeAddress: pawner.completeAddress,
    };

    const normalizeTrasactionInfo = {
      pawnerInfo: pawnerInfo,
      items: items,
    };

    return normalizeTrasactionInfo;
  }

  searchTransactionById(id: number) {
    return this.http.get<TransactionInformation>(
      this.url + `transaction/${id}`
    );
  }

  normalizedTransactionInformation(
    transactionInfo: TransactionInformation,
    transactionPawner,
    TransactionItems
  ) {
    transactionInfo.dateTransaction =
      transactionInfo.dateTransaction === null
        ? null
        : new Date(transactionInfo.dateTransaction).toISOString();
    transactionInfo.dateGranted =
      transactionInfo.dateGranted === null
        ? null
        : new Date(transactionInfo.dateMatured).toISOString();
    transactionInfo.dateMatured =
      transactionInfo.dateMatured === null
        ? null
        : new Date(transactionInfo.dateExpired).toISOString();
    transactionInfo.dateExpired =
      transactionInfo.dateExpired === null
        ? null
        : new Date(transactionInfo.dateExpired).toISOString();

    transactionInfo.totalAppraisal =
      typeof transactionInfo.totalAppraisal === 'number'
        ? transactionInfo.totalAppraisal
        : this.computationService.stringToNumber(
            transactionInfo.totalAppraisal
          );

    transactionInfo.principalLoan =
      typeof transactionInfo.principalLoan === 'number'
        ? transactionInfo.principalLoan
        : this.computationService.stringToNumber(transactionInfo.principalLoan);

    transactionInfo.interestRate =
      typeof transactionInfo.interestRate === 'number'
        ? transactionInfo.interestRate
        : this.computationService.stringToNumber(transactionInfo.interestRate);

    transactionInfo.interest =
      typeof transactionInfo.interest === 'number'
        ? transactionInfo.interest
        : this.computationService.stringToNumber(transactionInfo.interest);

    transactionInfo.discount =
      typeof transactionInfo.discount === 'number'
        ? transactionInfo.discount
        : this.computationService.stringToNumber(transactionInfo.discount);

    transactionInfo.penalty =
      typeof transactionInfo.penalty === 'number'
        ? transactionInfo.penalty
        : this.computationService.stringToNumber(transactionInfo.penalty);

    transactionInfo.dueAmount =
      typeof transactionInfo.dueAmount === 'number'
        ? transactionInfo.dueAmount
        : this.computationService.stringToNumber(transactionInfo.dueAmount);

    transactionInfo.discount =
      typeof transactionInfo.discount === 'number'
        ? transactionInfo.discount
        : this.computationService.stringToNumber(transactionInfo.discount);

    transactionInfo.advanceInterest =
      typeof transactionInfo.advanceInterest === 'number'
        ? transactionInfo.advanceInterest
        : this.computationService.stringToNumber(
            transactionInfo.advanceInterest
          );

    transactionInfo.advanceServiceCharge =
      typeof transactionInfo.advanceServiceCharge === 'number'
        ? transactionInfo.advanceServiceCharge
        : this.computationService.stringToNumber(
            transactionInfo.advanceServiceCharge
          );

    transactionInfo.serviceCharge =
      typeof transactionInfo.serviceCharge === 'number'
        ? transactionInfo.serviceCharge
        : this.computationService.stringToNumber(transactionInfo.serviceCharge);

    transactionInfo.netProceed =
      typeof transactionInfo.netProceed === 'number'
        ? transactionInfo.netProceed
        : this.computationService.stringToNumber(transactionInfo.netProceed);

    transactionInfo.netPayment =
      typeof transactionInfo.netPayment === 'number'
        ? transactionInfo.netPayment
        : this.computationService.stringToNumber(transactionInfo.netPayment);

    transactionInfo.redeemAmount =
      typeof transactionInfo.redeemAmount === 'number'
        ? transactionInfo.redeemAmount
        : this.computationService.stringToNumber(transactionInfo.redeemAmount);

    transactionInfo.partialAmount =
      typeof transactionInfo.partialAmount === 'number'
        ? transactionInfo.partialAmount
        : this.computationService.stringToNumber(transactionInfo.partialAmount);

    transactionInfo.receivedAmount =
      typeof transactionInfo.receivedAmount === 'number'
        ? transactionInfo.receivedAmount
        : this.computationService.stringToNumber(
            transactionInfo.receivedAmount
          );
    transactionInfo.additionalAmount =
      typeof transactionInfo.additionalAmount === 'number'
        ? transactionInfo.additionalAmount
        : this.computationService.stringToNumber(
            transactionInfo.additionalAmount
          );
    transactionInfo.availlableAmount =
      typeof transactionInfo.availlableAmount === 'number'
        ? transactionInfo.availlableAmount
        : this.computationService.stringToNumber(
            transactionInfo.availlableAmount
          );
    transactionInfo.newPrincipalLoan =
      typeof transactionInfo.newPrincipalLoan === 'number'
        ? transactionInfo.newPrincipalLoan
        : this.computationService.stringToNumber(
            transactionInfo.newPrincipalLoan
          );

    transactionInfo.change =
      typeof transactionInfo.change === 'number'
        ? transactionInfo.change
        : this.computationService.stringToNumber(transactionInfo.change);

    const user: User = JSON.parse(localStorage.getItem('user'));

    // transactionInfo.transactionPawner = {} as any;
    transactionInfo.transactionItems = [] as any;
    transactionInfo.employeeId = user.id;

    /* call save method after normalized the information */
    this.onSaveTransaction(transactionInfo);
  }
  updateDashBoardData() {
    this.http.get<DashBoardData[]>(this.url + 'dashboard').subscribe((dashboardData) => {
      this.dashBoardDataSource.next(dashboardData as any);
    });
  }

  getDashBoardData() {
   return this.http.get<DashBoardData[]>(this.url + 'dashboard');
  }
}

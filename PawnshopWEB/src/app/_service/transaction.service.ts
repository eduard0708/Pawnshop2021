import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ItemStatus, TransactionType } from '../_enum/enums';
import { Item } from '../_model/item/item';
import { ItemAuditTrail } from '../_model/item/item-audit-trail';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
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
  url = environment.baseUrl;
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

  normalizedTransationInfo(
    transactionInfo: TransactionInformation,
    pawnerInfo,
    itemsInfo
  ) {
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

    if (transactionInfo.transcationType === TransactionType.Redeem) {
      this.saveRedeemInfo = this.normalizeRedeemInfo(transactionInfo);
      this.saveRedeemInfo.transactionItems = [];
      let a: TransactionInformation = this.normalizeRedeemInfo(transactionInfo);
      //  a.transactionPawner = pawnerInfo
      a.transactionItems = [];
      a.transactionPawner = {} as TransactionPawner;

      this.saveTransaction(a);
    }
  }

  saveTransaction(saveTransaction) {
    console.log(saveTransaction);
    this.http
      .post(this.url + 'transaction/addtransaction', saveTransaction)
      .subscribe((transaction) => {
        this.router.navigateByUrl('invoicetest', {
          state: { print: transaction },
        });
      });
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

  normalizeRedeemInfo(transactionInfo: any) {
    let redeemInfo: TransactionInformation = transactionInfo;
    /* this discounts property is temporary used only because the discount property value is
    not appearing during save,  */
    redeemInfo.discount = this.computationService.stringToNumber(
      transactionInfo.discounts
    );
    redeemInfo.receivedAmount = this.computationService.stringToNumber(
      transactionInfo.receivedAmount
    );
    redeemInfo.interestRate = this.computationService.stringToNumber(
      transactionInfo.interestRate
    );
    redeemInfo.dateTransaction = new Date(
      transactionInfo.dateTransaction
    ).toISOString();

    return redeemInfo;
  }
}

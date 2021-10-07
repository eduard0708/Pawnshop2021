import { getLocaleDayNames } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../_model/item/item';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { NewTransaction } from '../_model/transaction/new-transaction';

@Injectable({
  providedIn: 'root',
})
export class RedeemService {
  uri: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  normalizePawnerInfo(t: NewTransaction) {
    let items: Item[];

    let pawner = t.transactionPawner;
    let pawnerInfo: PawnerInfo = {
      pawnerId: pawner.pawnerId,
      dateTransaction: new Date(t.dateTransaction),
      dateExpired: new Date(t.dateExpire),
      dateGranted: new Date(t.dateGranted),
      dateMatured: new Date(t.dateMature),
      firstName: pawner.firstName,
      lastName: pawner.lastName,
      contactNumber: pawner.contactNumber,
      city: pawner.city,
      barangay: pawner.barangay,
      completeAddress: pawner.completeAddress,
    };

   const normalizeTrasactionInfo = {
      pawnerInfo: pawnerInfo,
      items:items
    }

    return normalizeTrasactionInfo;
  }
}

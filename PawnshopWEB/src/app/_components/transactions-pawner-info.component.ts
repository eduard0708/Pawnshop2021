import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pawner } from '../_model/pawner';
import { PawnerInfo } from '../_model/pawnerInfo';
import { Transaction } from '../_model/transaction';

@Component({
  selector: 'app-transactions-pawner-info',
  templateUrl: './transactions-pawner-info.component.html'
})
export class TransactionsPawnerInfoComponent implements OnInit {

  @Input() transaction: Transaction ;
  pawner: Pawner = {} as Pawner;
  pawnerInfo:PawnerInfo = {} as PawnerInfo;
  dateTrasaction;
  constructor() {
   }
  ngOnInit(): void {
    this.pawner = this.transaction.pawner[0];
    this.pawnerInfo.id = this.pawner.id;
    this.pawnerInfo.firstName = this.pawner.firstName;
    this.pawnerInfo.lastName = this.pawner.lastName;
    this.pawnerInfo.contactNumber = this.pawner.contactNumber;
    this.pawnerInfo.city = this.pawner.city;
    this.pawnerInfo.barangay = this.pawner.barangay;
    this.pawnerInfo.completeAddress = this.pawner.completeAddress;
    this.pawnerInfo.dateTransaction = new Date(this.transaction.dateTransaction);
    this.pawnerInfo.dateGranted = new Date(this.transaction.dateGranted);
    this.pawnerInfo.dateMatured = new Date( this.transaction.dateMature);
    this.pawnerInfo.dateExpired = new Date(this.transaction.dateExpired);
    
  }

}

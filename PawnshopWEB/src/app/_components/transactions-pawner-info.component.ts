import { Component, Input, OnInit } from '@angular/core';
import { Pawner } from '../_model/pawner/Pawner';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { RedeemService } from '../_service/redeem.service';

@Component({
  selector: 'app-transactions-pawner-info',
  templateUrl: './transactions-pawner-info.component.html'
})
export class TransactionsPawnerInfoComponent implements OnInit {
 @Input() transactionInfo: NewTransaction ;
  pawner: Pawner = {} as Pawner;
  pawnerInfo:PawnerInfo = {} as PawnerInfo;
  constructor( private redeemService:RedeemService) {
   }

  ngOnInit(): void {

   const transactionInfo = this.redeemService.normalizePawnerInfo(this.transactionInfo)
    this.pawnerInfo = transactionInfo.pawnerInfo
    
  }

}

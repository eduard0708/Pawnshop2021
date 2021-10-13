import { Component, Input, OnInit } from '@angular/core';
import { Pawner } from '../_model/pawner/Pawner';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-transactions-pawner-info',
  templateUrl: './transactions-pawner-info.component.html',
  styleUrls:['../_sass/components.scss']
})
export class TransactionsPawnerInfoComponent implements OnInit {
 @Input() transactionInfo: NewTransaction ;
  pawner: Pawner = {} as Pawner;
  pawnerInfo:PawnerInfo = {} as PawnerInfo;
  constructor( private transactionService:TransactionService) {
   }

  ngOnInit(): void {

   const transactionInfo = this.transactionService.normalizePawnerInfo(this.transactionInfo)
    this.pawnerInfo = transactionInfo.pawnerInfo

  }

}

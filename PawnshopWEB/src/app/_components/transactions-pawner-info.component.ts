import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pawner } from '../_model/pawner/Pawner';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { PawnerService } from '../_service/pawner.service';
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-transactions-pawner-info',
  templateUrl: './transactions-pawner-info.component.html',
  styleUrls:['../_sass/components.scss']
})
export class TransactionsPawnerInfoComponent implements OnInit {
 @Input() transactionInfo: NewTransaction ;
  pawnerInfo:PawnerInfo;

  constructor( private transactionService:TransactionService,
    private pawnerService:PawnerService
    ) {
   }

  ngOnInit(): void {
    this.pawnerService.pawnerSource$.subscribe(pawner => {
       this.pawnerInfo = pawner;

      console.log(pawner);

    })
  }

}

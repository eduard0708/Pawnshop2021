import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardData } from '../_model/transaction/dashboard-data';

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss']
})
export class DashCardComponent implements OnInit {

  @Input() cardData: DashBoardData;
  transactionName: string = '';
  @Output() onNewTransaction: EventEmitter<string> = new EventEmitter();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  newTransaction(transactionName: string){
  this.onNewTransaction.emit(transactionName)
  }

  viewListTransaction(transName){
    this.router.navigate(['main/transactions/view-list-transaction'],{ queryParams: { transType: transName } });
  }

}

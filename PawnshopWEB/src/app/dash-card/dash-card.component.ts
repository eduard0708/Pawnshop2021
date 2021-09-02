import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionCard } from '../_model/transaction-card';

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss']
})
export class DashCardComponent implements OnInit {

  @Input() cardData: TransactionCard;
  transactionName: string = '';
  @Output() onNewTransaction: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  newTransaction(transactionName: string){
  this.onNewTransaction.emit(transactionName)
  }

}

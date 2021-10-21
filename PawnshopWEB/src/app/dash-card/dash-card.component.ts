import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  bgColor ='blue'
  constructor() { }

  ngOnInit(): void {
  }

  newTransaction(transactionName: string){
  this.onNewTransaction.emit(transactionName)
  }

  viewTransaction(){
    alert("Have a nice Day smile...")
  }

}

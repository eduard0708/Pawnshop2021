import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TransactionCard } from '../_model/transaction-card';

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss']
})
export class DashCardComponent implements OnInit {

  @Input() cardData: TransactionCard;


  constructor() { }

  ngOnInit(): void {
    console.log(this.cardData);
    
  }

}

import { Component, OnInit } from '@angular/core';
import { TransactionCard } from '../_model/transaction-card';
import { TestService } from '../_service/test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  dataForCard: TransactionCard[] = [{ transactionCount: 0, transactionName: '', transactionTotal: 0 }];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getCardDetails().subscribe(data => {
    this.dataForCard = data
  });
  }

}

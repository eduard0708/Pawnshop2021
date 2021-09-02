import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTransacitonComponent } from '../_dialogs/dialog-transaciton.component';
import { TransactionCard } from '../_model/transaction-card';
import { TestService } from '../_service/test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  dataForCard: TransactionCard[] = [{ transactionCount: 0, transactionName: '', transactionTotal: 0 }];


  constructor(private testService: TestService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.testService.getCardDetails().subscribe(data => {
    this.dataForCard = data
  });
  }

  newTransaction(transactionInfo:any){
    console.log(transactionInfo);   
  }

  openSearchDialog(){
    this.dialog.open(DialogTransacitonComponent)
  }
}

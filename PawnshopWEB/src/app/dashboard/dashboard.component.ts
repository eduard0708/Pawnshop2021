import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogTransacitonComponent } from '../_dialogs/dialog.transaction.component';
import { DashBoardData } from '../_model/transaction/dashboard-data';
import { TransactionCard } from '../_model/TransactionCard';
import { DashboardService } from '../_service/dashboard.service';
import { TransactionService } from '../_service/transaction.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['../_sass/dashboard.scss']
})
export class DashboardComponent implements OnInit {

  dataForCard: DashBoardData[] = [];
  transactionType: string;

  constructor(private dashboardService:DashboardService, private dialog: MatDialog, private transactionService :TransactionService) {}

  ngOnInit(): void {
    // this.dashboardService.getCardDetails().subscribe((data) => {
    //   this.dataForCard = data;
    // });
    this.transactionService.getDashBoardData().subscribe(data => {
      this.transactionService.dashBoardDataSource.next(data as any)
    })

    this.transactionService.dashBoardDataSource$.subscribe(data => {
      console.log(data);
      this.dataForCard = data as any;
    })
  }

  newTransaction(transactionType: string) {
       this.openDialog(transactionType)
  }

  openDialog(transactionType) {
    const config = new MatDialogConfig();
    config.position = { top: '5rem' };
    config.disableClose = true;
    config.data = transactionType;
    config.width = '20vw';

    this.dialog.open(DialogTransacitonComponent, config);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogTransacitonComponent } from '../_dialogs/dialog.transaction.component';
import { DashBoardData } from '../_model/transaction/dashboard-data';
import { TransactionService } from '../_service/transaction.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../_sass/dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  dataForCard: DashBoardData[] = [];
  transactionType: string;

  constructor(
    private dialog: MatDialog,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {

    this.transactionService.getDashBoardData().subscribe((data) => {
      this.transactionService.dashBoardDataSource.next(data as any);
      console.log(data);

    });

    this.transactionService.dashBoardDataSource$.subscribe((data) => {
     this.dataForCard = data as any;
    });
  }
  newTransaction(transactionType: string) {
    this.openDialog(transactionType);
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

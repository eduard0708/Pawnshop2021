import { Component, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogTransacitonComponent } from '../_dialogs/dialog-transaciton.component';
import { TransactionCard } from '../_model/transaction-card';
import { TestService } from '../_service/test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dataForCard: TransactionCard[] = [
    { transactionCount: 0, transactionName: '', transactionTotal: 0 },
  ];
  transactionType: string;

  constructor(private testService: TestService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.testService.getCardDetails().subscribe((data) => {
      this.dataForCard = data;
    });
  }

  newTransaction(transactionType: string) {
       this.openDialog(transactionType)
  }

  openDialog(transactionType) {
    const config = new MatDialogConfig();
    config.position = { top: '5rem' };
    config.disableClose = true;
    config.data = transactionType;
    config.width = '25vw';

    this.dialog.open(DialogTransacitonComponent, config);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}

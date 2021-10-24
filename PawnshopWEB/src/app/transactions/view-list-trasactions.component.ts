import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewTransactionList } from '../_model/view-transaction-list';
import { NotifierService } from '../_service/notifier.service';
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-view-list-trasactions',
  templateUrl: './view-list-trasactions.component.html',
  styleUrls: ['../_sass/view-list-transaction.scss'],
})
export class ViewListTrasactionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayColumns: string[] = [
    'index',
    'transactionId',
    'loanStatus',
    'dateTransaction',
    'transactionType',
    'firstName',
    'lastName',
    'action',
  ];
  transactionType: string;
  public dataSource: MatTableDataSource<ViewTransactionList>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService,
    private transactionService: TransactionService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.transactionType = params.transType;
    });

    this.dataSource = new MatTableDataSource<ViewTransactionList>();
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 100);
    this.transactionService
      .getViewListTransaction(this.transactionType)
      .subscribe((transactionList) => {
        this.dataSource.data = transactionList;
      });
  }
  home() {
    this.router.navigateByUrl('main/dashboard');
  }


  viewTransaction(transaction){
    this.transactionService.searchTransactionById(transaction.transactionId).subscribe(data => {
      if(data)
       this.router.navigateByUrl('view-transaction', {state:{transaction: data}})
    });
  }

  filter(){
    
  }

}

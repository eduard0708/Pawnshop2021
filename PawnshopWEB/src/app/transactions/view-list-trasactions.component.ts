import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../_model/address/city';
import { TransactionInformation } from '../_model/transaction/transaction-information';
import { AddressService } from '../_service/address.service';
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
    'id',
    'type',
    'status',
    'date',
    'firstname',
    'lastname',
    'action',
  ];
  transactionType: string;
  public dataSource: MatTableDataSource<ViewListTransaction>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService,
    private transactionService: TransactionService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.transactionType = params.transType;
    });

    this.dataSource = new MatTableDataSource<ViewListTransaction>();
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 100);

    this.transactionService
      .getViewListTransaction(this.transactionType)
      .subscribe((transactionList) => {
        this.setTransactionViewList(transactionList);
      });
  }

  home(){
    this.router.navigateByUrl('main/dashboard')
  }

  // getCity() {
  //   this.addressService.getCities().subscribe(
  //     (cities) => {
  //       this.dataSource.data = cities;
  //       this.tableLength = this.dataSource.data.length;
  //     },
  //     (error) => console.log(error)
  //   );
  // }
  setTransactionViewList(transaction: TransactionInformation[]) {
    let viewListTrans: ViewListTransaction[] = [];
    for (let index = 0; index < transaction.length; index++) {
      const transactionList = transaction[index];
      let viewTrans: ViewListTransaction = {
        transactionId: transactionList.transactionsId,
        transctionType: transactionList.transactionType,
        status: transactionList.status,
        dateTransaction: transactionList.dateTransaction,
        firstname: transactionList.transactionPawner.firstName,
        lastname: transactionList.transactionPawner.lastName,
      };
      viewListTrans.push(viewTrans);
    }

    this.dataSource.data = viewListTrans;
  }
}

export interface ViewListTransaction {
  transactionId: number;
  transctionType: string;
  status: string;
  dateTransaction: string;
  firstname: string;
  lastname: string;
}

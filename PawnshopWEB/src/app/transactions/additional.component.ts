import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { Item } from '../_model/item';
import { Pawner } from '../_model/pawner';
import { PawnerInfo } from '../_model/pawnerInfo';
import { Transaction } from '../_model/transaction';
import { RedeemService } from '../_service/redeem.service';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html'
})
export class AdditionalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  transaction:Transaction = {} as Transaction;
  items:Item[] = [];
  pawnerInfo:PawnerInfo = {} as PawnerInfo;
  additionalForm:FormGroup;

  displayColumns: string[] = 
  [
    'category',
    'categoryDescription',
    'description',
    'appraisalValue',
  ];
  public dataSource: MatTableDataSource<Item>;

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '₱ ',
    placeholder: '0',
  })

  constructor(
    private redeemService: RedeemService,
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute:ActivatedRoute,
    private router: Router
    ) 
    { 
    // get the pawner information from the params of the link, from dialog-transaction component
    // pawner info will go to transaction-pawner-info component
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
       this.transaction = this.router.getCurrentNavigation().extras.state.transaction;
       this.items = this.transaction.pawnedItems;
      }
    });

      this.additionalForm = fb.group({
        redeemAmount:[],
        dateTransaction:[],
        dateGranted:[],
        dateMatured:[],
        dateExpired:[],
        totalAppraisal:[],
        transaction:[]
      });

      this.dataSource = new MatTableDataSource<Item>();
    }

  ngOnInit(): void {
    this.dataSource.data = this.items;
  }

  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    
  }
  onSave(){
   
  }

  home(){
    this.router.navigateByUrl('/dashboard');
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { Item } from '../_model/item/item';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { RedeemService } from '../_service/redeem.service';

@Component({
  selector: 'app-partial',
  templateUrl: './partial.component.html',
  styleUrls: ['../_sass/shared-transaction.scss']
})
export class PartialComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  transactionInfo:NewTransaction = {} as NewTransaction;
  items:Item[] = [];
  pawnerInfo:PawnerInfo = {} as PawnerInfo;
  partialForm:FormGroup;
 
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
       this.transactionInfo = this.router.getCurrentNavigation().extras.state.transaction;
       
      }
    });

      this.partialForm = fb.group({
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
    this.router.navigateByUrl('main/dashboard');
  }

}

import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { CalcDate } from '../_model/CalcDate';
import { Item } from '../_model/item/item';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { RedeemService } from '../_service/redeem.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['../_sass/shared-transaction.scss']
})

export class RedeemComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  transactionInfo:NewTransaction = {} as NewTransaction;
  items:Item[] = [];
  pawnerInfo:PawnerInfo = {} as PawnerInfo;
  redeemForm:FormGroup;
 
  displayColumns: string[] = 
  [
    'category',
    'categoryDescription',
    'description',
    'appraisalValue'
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
       const normalizeInfo = this.redeemService.normalizePawnerInfo(this.transactionInfo);
       this.items = normalizeInfo.items
      }
    });
    let calcDate = new CalcDate(new Date(this.transactionInfo.dateTransaction));

     this.redeemForm = fb.group({

        redeemAmount:[],
        dateTransaction:[new Date(),],
        dateGranted:[],
        dateMatured:[],
        dateExpired:[],
        totalAppraisal:[],
        transaction:[],
        totalDays:[calcDate.getDays()],
        totalMonths:[calcDate.getMonhts()],
        totalYears:[calcDate.getYears()],
        status:[calcDate.getStatus()]
      });

      this.dataSource = new MatTableDataSource<Item>();
    }

  ngOnInit(): void {

      console.log(new Date(this.redeemForm.controls.dateTransaction.value));

      this.redeemForm.valueChanges.subscribe(()=>{
          let dt = new Date(new Date(this.redeemForm.controls.dateTransaction.value).setHours(0,0,0,0) )  
          let dg = new Date(new Date(this.redeemForm.controls.dateGranted.value).setHours(0,0,0,0) )  
          let days = ((dg.getTime() - dt.getTime()) / (24*3600*1000 ))
 
        console.log(days);
        
        
        
      })
 
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

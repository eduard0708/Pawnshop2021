import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { Item } from '../_model/item';
import { Pawner } from '../_model/pawner';
import { Transaction } from '../_model/transaction';
import { RedeemService } from '../_service/redeem.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html'
})

export class RedeemComponent implements OnInit {
  redeemForm:FormGroup;
  public pawner:Pawner;
  public transaction:Transaction;
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
    // get the pawner information from the params of the link
    this.activatedRoute.queryParams.subscribe((params) => {
      
      if (this.router.getCurrentNavigation().extras.state) {
        this.transaction = this.router.getCurrentNavigation().extras.state.transaction;
      }

    });

      this.redeemForm = fb.group({
        redeemAmount:[],
        dateTransaction:[],
        dateGranted:[],
        dateMature:[],
        dateExpire:[],
        totalAppraisal:[],
        transaction:[]
      });

    }

  ngOnInit(): void {
    this.pawner = this.transaction.pawner[0];
    
  }

  onSave(){
   
  }

  home(){
    this.router.navigateByUrl('/dashboard');
  }
}

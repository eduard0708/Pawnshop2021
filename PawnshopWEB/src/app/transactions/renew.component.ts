import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { DateHelper } from '../_model/DateHelper';
import { Item } from '../_model/item/item';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { RedeemService } from '../_service/redeem.service';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['../_sass/shared-transaction.scss']
})
export class RenewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  transactionInfo: NewTransaction = {} as NewTransaction;
  items: Item[] = [];
  pawnerInfo: PawnerInfo = {} as PawnerInfo;
  renewForm: FormGroup;
  moments;

  displayColumns: string[] = [
    'index',
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
  });

  constructor(
    private redeemService: RedeemService,
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // get the pawner information from the params of the link, from dialog-transaction component
    // pawner info will go to transaction-pawner-info component
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.transactionInfo =
          this.router.getCurrentNavigation().extras.state.transaction;
        const normalizeInfo = this.redeemService.normalizePawnerInfo(
          this.transactionInfo
        );
        this.items = normalizeInfo.items;
      }
    });

    let dateStatus = new DateHelper(
      new Date(this.transactionInfo.dateTransaction),
      new Date(this.transactionInfo.dateMature),
      new Date(this.transactionInfo.dateExpire)
    );
  
    this.renewForm = fb.group({
      redeemAmount: [],
      dateTransaction: [new Date()],
      dateGranted: [],
      dateMatured: [],
      dateExpired: [],
      totalAppraisal: [],
      transaction: [],
      totalDays: [dateStatus.days()],
      totalMonths: [dateStatus.months()],
      totalYears: [dateStatus.years()],
      status: [dateStatus.status()],
      moments:[dateStatus.moments()]
    });
    
    this.dataSource = new MatTableDataSource<Item>();
  }

  ngOnInit(): void {
      let items: Item[]=[];
    for (let index = 0; index < this.transactionInfo.transactionItems.length; index++) {
      const item = this.transactionInfo.transactionItems[index];
        let nItem:Item = {
          itemId: item.itemId,
          categoryId:0,
          category:item.category,
          categoryDescription:item.categoryDescription,
          description:item.itemDescription,
          appraisalValue:item.appraisalValue
        }
        items.push(nItem);
    }
      this.dataSource.data = items;

    // console.log(new Date(this.renewForm.controls.dateTransaction.value));
    this.renewForm.valueChanges.subscribe(() => {
      let dt = new Date(new Date(this.renewForm.controls.dateTransaction.value).setHours(0,0,0,0));
      let dg = new Date(
        new Date(this.renewForm.controls.dateGranted.value).setHours(0,0,0,0) );
      let days = (dg.getTime() - dt.getTime()) / (24 * 3600 * 1000);

    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  onSave() {}

  home() {
    this.router.navigateByUrl('main/dashboard');
  }
}

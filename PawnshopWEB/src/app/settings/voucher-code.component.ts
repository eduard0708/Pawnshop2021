import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VoucherCode } from '../_model/voucher/voucher-code';
import { NotifierService } from '../_service/notifier.service';
import { VoucherService } from '../_service/voucher.service';

@Component({
  selector: 'app-voucher-code',
  templateUrl: './voucher-code.component.html',
  styleUrls: ['../_sass/settings_scss/voucher-code.scss'],
})
export class VoucherCodeComponent implements OnInit {
  @ViewChild('voucherCodeRef', { static: true }) voucherCodeRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  voucherCodeForm: FormGroup;
  isAdd = true;
  tableLength: number;
  voucherCodes: VoucherCode[] = [];
  displayColumns: string[] = ['id', 'name', 'action'];
  public dataSource: MatTableDataSource<VoucherCode>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private voucherService: VoucherService
  ) {
    this.voucherCodeForm = this.fb.group({
      // id: [],
      codeName: ['', Validators.required],
      filterText: [],
    });

    this.dataSource = new MatTableDataSource<VoucherCode>();
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.voucherCodeRef.nativeElement.focus();
    }, 100);
    this.getVoucherCode();

    this.voucherCodeForm.valueChanges.subscribe(
      () => {
        this.isAdd = !this.voucherCodeForm.valid;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filter() {
    this.dataSource.filter = this.voucherCodeForm.controls.filterText.value;
  }

  reset() {
    this.dataSource.filter = '';
    this.voucherCodeForm.reset();
    this.voucherCodeRef.nativeElement.focus();
  }
  cancel() {
    this.router.navigateByUrl('main/dashboard');
  }
  save() {
     this.voucherService.addVoucherCode(this.voucherCodeForm.value).subscribe((voucherCode) => {
      this.voucherCodes = [...this.dataSource.data]
      this.voucherCodes.push(voucherCode)
      this.dataSource.data =  this.voucherCodes ;
      this.notifierService.success(`New Voucher Type: ${voucherCode.codeName}`);
    });
    this.voucherCodeForm.reset();
    this.voucherCodeRef.nativeElement.focus();
  }

  getVoucherCode() {
   this.voucherService.getVoucherCode().subscribe(voucherCode => {
     this.dataSource.data = voucherCode;
     console.log(voucherCode);

   })
  }
}

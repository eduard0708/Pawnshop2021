import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VoucherType } from '../_model/voucher/voucherType';
import { NotifierService } from '../_service/notifier.service';
import { VoucherService } from '../_service/voucher.service';

@Component({
  selector: 'app-voucher-type',
  templateUrl: './voucher-type.component.html',
  styleUrls: ['../_sass/settings_scss/voucher-type.scss'],
})
export class VoucherTypeComponent implements OnInit {
  @ViewChild('voucherTypeRef', { static: true }) voucherTypeRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  voucherTypeForm: FormGroup;
  isAdd = true;
  tableLength: number;
  voucherTypes: VoucherType[] = [];
  displayColumns: string[] = ['id', 'name', 'action'];
  public dataSource: MatTableDataSource<VoucherType>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private voucherService: VoucherService
  ) {
    this.voucherTypeForm = this.fb.group({
      // id: [],
      typeName: ['', Validators.required],
      filterText: [],
    });

    this.dataSource = new MatTableDataSource<VoucherType>();
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.voucherTypeRef.nativeElement.focus();
    }, 100);
    this.getVoucherType();

    this.voucherTypeForm.valueChanges.subscribe(
      () => {
        this.isAdd = !this.voucherTypeForm.valid;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filter() {
    this.dataSource.filter = this.voucherTypeForm.controls.filterText.value;
  }

  reset() {
    this.dataSource.filter = '';
    this.voucherTypeForm.reset();
    this.voucherTypeRef.nativeElement.focus();
  }
  cancel() {
    this.router.navigateByUrl('main/dashboard');
  }
  save() {
     this.voucherService.addVoucherType(this.voucherTypeForm.value).subscribe((voucherType) => {
      this.voucherTypes = [...this.dataSource.data]
      this.voucherTypes.push(voucherType)
      this.dataSource.data =  this.voucherTypes ;
      this.notifierService.success(`New Voucher Type: ${voucherType.typeName}`);
    });
    this.voucherTypeForm.reset();
    this.voucherTypeRef.nativeElement.focus();
  }

  getVoucherType() {
   this.voucherService.getVoucherType().subscribe(voucherType => {
     this.dataSource.data = voucherType;
   })
  }
}

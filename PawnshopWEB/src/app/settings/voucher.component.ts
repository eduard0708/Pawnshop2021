import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { VoucherCode } from '../_model/voucher/voucher-code';
import { VoucherType } from '../_model/voucher/voucherType';
import { EmployeeService } from '../_service/employee.service';
import { NotifierService } from '../_service/notifier.service';
import { VoucherService } from '../_service/voucher.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['../_sass/settings_scss/voucher.scss'],
})
export class VoucherComponent implements OnInit {
  @ViewChild('codeRef') codeRef: MatSelect;
  voucherForm: FormGroup;
  voucherCodes:VoucherCode[]=[];
  voucherTypes:VoucherType[]=[];

  cashCheque = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Cheque' },
  ];

  isSave: boolean = true;

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '₱ ',
    placeholder: '0',
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private voucherService:VoucherService,
    private employeeService:EmployeeService
  ) {
    this.voucherForm = fb.group({
      dateEntry: [new Date(), Validators.required],
      code: ['', Validators.required],
      type: ['', Validators.required],
      cashCheque: ['', Validators.required],
      amount: ['', [Validators.required, Validators.minLength(10)]],
      remarks: ['', Validators.required],
      employeeId:[],
      isDeleted:[false]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.codeRef.focus();
    }, 100);
    this.getVoucherCode();
    this.getVoucherType();

    this.voucherForm.valueChanges.subscribe(() => {
      this.isSave = !this.voucherForm.valid;
    });
  }

  cancel() {
    this.router.navigateByUrl('main/dashboard');
  }

  reset() {
    this.voucherForm.reset();
    this.voucherForm.controls.dateEntry.setValue(new Date())
    this.codeRef.focus();
  }

  save() {
    this.employeeService.currentUser$.subscribe(emp => this.voucherForm.controls.employeeId.setValue(emp.id));
    this.voucherService.addVoucher(this.voucherForm.value)
  }

  getVoucherCode(){
    this.voucherService.getVoucherCode().subscribe(code => {
      this.voucherCodes = code;
    })
  }
  getVoucherType(){
    this.voucherService.getVoucherType().subscribe(type => {
      this.voucherTypes = type;
    })
  }
}

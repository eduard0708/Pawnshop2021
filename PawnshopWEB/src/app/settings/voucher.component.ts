import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { NotifierComponent } from '../_dialogs/notifier/notifier.component';
import { AddressService } from '../_service/address.service';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['../_sass/settings_scss/voucher.scss'],
})
export class VoucherComponent implements OnInit {
  @ViewChild('codeRef') codeRef: MatSelect;
  voucherForm: FormGroup;
  codes = [
    { codeId: 1, codeName: 'code 1' },
    { codeId: 2, codeName: 'code 2' },
    { codeId: 2, codeName: 'code 3' },
  ];
  types = [
    { typeId: 1, typeName: 'type 1' },
    { typeId: 2, typeName: 'type 2' },
    { typeId: 2, typeName: 'type 3' },
  ];
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
  ) {
    this.voucherForm = fb.group({
      dateEntry: [new Date(), Validators.required],
      code: ['', Validators.required],
      type: ['', Validators.required],
      cashCheque: ['', Validators.required],
      amount: ['', [Validators.required, Validators.minLength(10)]],
      remarks: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.codeRef.focus();
    }, 100);

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

  save() {}
}

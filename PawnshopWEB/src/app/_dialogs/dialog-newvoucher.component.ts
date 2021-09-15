import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select } from '../_model/select';
import { VoucherService } from '../_service/voucher.service';

@Component({
  selector: 'app-dialog-newvoucher',
  templateUrl: './dialog-newvoucher.component.html',
  styleUrls: ['../_sass/dialog.voucher.scss'],
  
})
export class DialogNewvoucherComponent implements OnInit {

  voucherForm:FormGroup;
  transactionCodes:Select[]=[];
  cashCheques:Select[]=[];
  trasactionTypes:Select[]=[];
  
  constructor(
    private fb: FormBuilder,
    private voucherService:VoucherService,
    private dialogRef:MatDialogRef<DialogNewvoucherComponent>
  ) { 
    this.voucherForm = this.fb.group(
      {
        transactionDate:[new Date(), Validators.required],
        transactionCode:[Validators.required],
        transactionType:[Validators.required],
        cashCheque:[Validators.required],
        amount:['',Validators.required],
        remarks:['',],
      }
    )

  }

  ngOnInit(): void {
    this.voucherService.getCashCheque().subscribe( cash => this.cashCheques = cash as any);
    this.voucherService.getTransactionCode().subscribe( code => this.transactionCodes = code as any);
    this.voucherService.getTransactionType().subscribe( type => this.trasactionTypes = type as any);
  }

  addVoucher(){

  }

  close(){
    this.dialogRef.close()
  }

}

import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { createMask } from '@ngneat/input-mask';
import { Select } from '../_model/select';
import { VoucherService } from '../_service/voucher.service';

@Component({
  selector: 'app-dialog-newvoucher',
  templateUrl: './dialog-newvoucher.component.html',
  styleUrls: ['../_sass/dialog.voucher.scss'],
  
})
export class DialogNewvoucherComponent implements OnInit {
@ViewChild('f') private form:NgForm
  voucherForm:FormGroup;
  transactionCodes:Select[]=[];
  cashCheques:Select[]=[];
  trasactionTypes:Select[]=[];
  isBtnSave:boolean = true;

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '₱ ',
    placeholder: '0',
  })

  
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
        remarks:['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
    console.log(this.voucherForm.valid);   
    this.voucherService.getCashCheque().subscribe( cash => this.cashCheques = cash as any);
    this.voucherService.getTransactionCode().subscribe( code => this.transactionCodes = code as any);
    this.voucherService.getTransactionType().subscribe( type => this.trasactionTypes = type as any);

    this.voucherForm.statusChanges.subscribe(()=> 
    {
      this.isBtnSave = !this.voucherForm.valid;      
      console.log(this.voucherForm.valid);  
    })
  }

  addVoucher(){

  }

  reset(){

    Object.keys(this.voucherForm.controls).forEach(keys =>{
      this.voucherForm.get(keys).setErrors(null);
      if(keys === 'amount'){
        console.log('not amount');
      }else this.voucherForm.get(keys).reset();
    });

     this.voucherForm.controls.transactionDate.setValue(new Date());
    // this.voucherForm.controls.transactionCode.setValue('');
    // this.voucherForm.controls.transactionType.setValue('');
    // this.voucherForm.controls.cashCheque.setValue('');
    // this.voucherForm.controls.amount.setValue(0);
    this.voucherForm.controls.remarks.setValue('');
    
    this.voucherForm.controls.remarks.setErrors(null)
    this.voucherForm.controls.remarks.updateValueAndValidity()
  
    console.log(this.voucherForm.valid);  
      

  }
  close(){
    this.dialogRef.close()
  }

}

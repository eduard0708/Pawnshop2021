import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Select } from '../_model/select';
import { VoucherCode } from '../_model/voucher/voucher-code';
import { VoucherType } from '../_model/voucher/voucherType';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  baseUrl:string = environment.baseUrl + 'voucher/';

  constructor(
    private http:HttpClient
  ) { }

  getVoucherType(){
    return this.http.get<VoucherType[]>(this.baseUrl +'voucher-type')
  }

  addVoucherType(voucherType:string){
    return this.http.post<VoucherType>(this.baseUrl +'add-voucher-type', voucherType)
  }
  getVoucherCode(){
    return this.http.get<VoucherCode[]>(this.baseUrl +'voucher-code')
  }

  addVoucherCode(voucherCode:VoucherCode){
    console.log(voucherCode);

    return this.http.post<VoucherCode>(this.baseUrl +'add-voucher-code', voucherCode)
  }
}

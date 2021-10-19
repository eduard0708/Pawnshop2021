import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Select } from '../_model/select';
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
    return this.http.get<VoucherType>(this.baseUrl +'voucher-type')
  }

  addVoucherType(vouchertype:string){
    return this.http.post<VoucherType>(this.baseUrl +'add-voucher-type', vouchertype)
  }
}

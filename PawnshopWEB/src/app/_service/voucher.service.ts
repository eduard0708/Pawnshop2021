import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Select } from '../_model/select';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  baseUrl:string = environment.baseUrl + 'voucher/';

  constructor(
    private http:HttpClient
  ) { }

  // getTransactionType(){
  //   return this.http.get<Select>(this.uri +'transactionType');
  // }
  // getTransactionCode(){
  //   return this.http.get<Select>(this.uri +'transactionCode');
  // }
  // getCashCheque(){
  //   return this.http.get<Select>(this.uri +'cashCheque');
  // }

}

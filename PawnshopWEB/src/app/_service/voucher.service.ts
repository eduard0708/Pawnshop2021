import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select } from '../_model/select';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  uri:string = 'http://localhost:3000/';

  constructor(
    private http:HttpClient
  ) { }

  getTransactionType(){
    return this.http.get<Select>(this.uri +'transactionType');
  }
  getTransactionCode(){
    return this.http.get<Select>(this.uri +'transactionCode');
  }
  getCashCheque(){
    return this.http.get<Select>(this.uri +'cashCheque');
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../_model/transaction/new-transaction';

@Injectable({
  providedIn: 'root'
})
export class RedeemService {
  uri:string = 'http://localhost:3000/';
  
  constructor(private http: HttpClient) {

   }

  findTrasaction(){
   return this.http.get<Transaction>(this.uri + 'transaction');
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionCard } from '../_model/transaction-card';

@Injectable({
  providedIn: 'root'
})
export class TestService {

   uri = 'http://localhost:3000/'
   cardData:TransactionCard = {}as any;

  constructor(private http:HttpClient) { }

  getCardDetails(){
    return this.http.get<TransactionCard[]>(this.uri +'cardData');
  }
}

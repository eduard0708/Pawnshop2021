import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pawner } from '../_model/pawner';
import { TransactionCard } from '../_model/transaction-card';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  uri = 'http://localhost:3000/';
  cardData: TransactionCard = {} as any;
  
  //observable existing pawner
  existingPawner = new Subject();

  constructor(private http: HttpClient) {}

  getCardDetails() {
    return this.http.get<TransactionCard[]>(this.uri + 'cardData');
  }

  findPawner() {
    return this.http.get<Pawner[]>(this.uri + 'pawner');
  }

  newPawner(pawner:Pawner){
     this.http.post(this.uri + 'pawner', pawner).subscribe(data => console.log(data)
     );
  }
}

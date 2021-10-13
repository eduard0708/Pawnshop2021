import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Barangay } from '../_model/address/barangay';
import { City } from '../_model/address/city';
import { Pawner } from '../_model/pawner/Pawner';
import { Select } from '../_model/select';
import { NewTransaction } from '../_model/transaction/new-transaction';
import { TransactionInformation } from '../_model/transaction/transaction-information';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  uri = 'http://localhost:3000/';
  url = environment.baseUrl;

  constructor(private http:HttpClient) { }

  addPawner(pawner:Pawner){

  }

  getTransaction(){
      return this.http.get(this.uri + 'transaction');
  }

  getCity(){
    return this.http.get<Select[]>(this.uri + 'city');
  }
  getBarangay(){
    return this.http.get<Select[]>(this.uri + 'barangay');
  }

  getAllCity(){
    return this.http.get<City[]>(this.uri + 'city');
  }

  getAllBarangay(){
    return this.http.get<Barangay[]>(this.uri + 'barangay');
  }

  searchTransactionId(id:number){
    return this.http.get<TransactionInformation>(this.url + `transaction/${id}`);
  }
}

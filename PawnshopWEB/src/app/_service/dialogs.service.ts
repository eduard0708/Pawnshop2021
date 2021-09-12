import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pawner } from '../_model/pawner';
import { Select } from '../_model/select';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  uri = 'http://localhost:3000/';

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
}

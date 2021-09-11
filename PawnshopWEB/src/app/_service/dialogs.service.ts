import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pawner } from '../_model/pawner';

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
}

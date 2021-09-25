import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddPawner } from '../_model/addpawner';
import { Pawner } from '../_model/pawner';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root',
})
export class PawnerService {
  uriJson: string = 'http://localhost:3000/';
  url = environment.baseUrl + 'pawner/';
  constructor(private http: HttpClient) {}

  searchPawner() {
    return this.http.get<Pawner[]>(this.uriJson + 'pawner');
  }

  createPawner(pawner: Pawner) {
    this.http.post(this.url + 'add-pawner', pawner).subscribe((data) => {});
  }

  addPawner(pawner: AddPawner) {
      return this.http.post(this.url + 'add-pawner', pawner);
  }

  findPawner(contactOrTrasactionNumber:number){
    return this.http.get(this.url + 'contact-number/contactOrTrasactionNumber')
  }
}

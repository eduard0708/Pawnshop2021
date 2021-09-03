import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pawner } from '../_model/pawner';

@Injectable({
  providedIn: 'root'
})

export class PawnerService {
  uri:string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  searchPawner() {
    return this.http.get<Pawner[]>(this.uri + 'pawner');
  }
}

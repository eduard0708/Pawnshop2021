import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pawner } from '../_model/pawner';

@Injectable({
  providedIn: 'root'
})


export class PawnerService {
  uriJson:string = 'http://localhost:3000/';
  url= environment.baseUrl + 'pawner/'
  constructor(private http: HttpClient) { }

  searchPawner() {
    return this.http.get<Pawner[]>(this.uriJson + 'pawner');
  }

  createPawner(pawner:Pawner){
    
    this.http.post(this.url + 'add-pawner', pawner).subscribe(data => {}
    );
  }


}

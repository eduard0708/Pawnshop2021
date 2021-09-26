import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Barangay } from '../_model/barangay';
import { City } from '../_model/city';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiUrl = environment.baseUrl + 'address/'
  constructor(private http: HttpClient) { }

  addCity(city:any){
    return this.http.post<City>(this.apiUrl + 'add-city', city);
  }

  getCities(){
    return this.http.get<City[]>(this.apiUrl + 'cities');
  }
  getCitiesWithBarangays(){
    return this.http.get<City[]>(this.apiUrl + 'city-barangay');
  }
  getBarangays(){
   return this.http.get<Barangay[]>(this.apiUrl + 'barangays');
  }

  addBarangay(barangay:any){
   return this.http.post<Barangay>(this.apiUrl + 'add-barangay', barangay);
  }
}

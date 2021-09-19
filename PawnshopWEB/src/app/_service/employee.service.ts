import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeLogin } from '../_model/employee-login';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url ="http://localhost:5000/account/"
  constructor(
    private http: HttpClient
  ) { }

    login(emplogin:EmployeeLogin){
      this.http.post(this.url + 'login', emplogin).subscribe(
        
      )
    }

}

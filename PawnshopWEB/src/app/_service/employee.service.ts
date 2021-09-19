import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeLogin } from '../_model/employee-login';
import { map } from "rxjs/operators";
import { User } from '../_model/user';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  url ="http://localhost:5000/account/";
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

    login(emplogin:EmployeeLogin){
     return this.http.post(this.url + 'login', emplogin).pipe(
       map((employee:User)=> {
          const user = employee;
          if(user){
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
            this.router.navigateByUrl('dashboard');
          }
       })
     )
    }

    setCurrentUser(user:User){
      this.currentUserSource.next(user);
    }

    logout(){
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
    }

}

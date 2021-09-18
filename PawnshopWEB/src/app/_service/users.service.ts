import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri="http://localhost:5000/api/"
  constructor(
    private http:HttpClient
  ) { }

    getUsers(){
      this.http.get(this.uri + "users").subscribe(user => console.log(user)
      );
    }
}

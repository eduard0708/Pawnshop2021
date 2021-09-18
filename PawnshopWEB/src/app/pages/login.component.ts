import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../_service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  rippleColor:string="#fff"

  constructor(
    private router: Router,
    private userService:UsersService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigateByUrl('/dashboard')
    this.userService.getUsers();
  }

}

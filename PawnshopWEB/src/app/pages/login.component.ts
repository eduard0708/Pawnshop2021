import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeLogin } from '../_model/employee-login';
import { User } from '../_model/user';
import { EmployeeService } from '../_service/employee.service';
import { UsersService } from '../_service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  rippleColor:string="#fff"
  loginForm:FormGroup;

  constructor(
    private router: Router,
    private employeeService:EmployeeService,
    private userService:UsersService,
    private fb: FormBuilder
  ) {

    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
   }

  ngOnInit(): void {
    
  }

  login(){
      this.employeeService.login(this.loginForm.value).subscribe();
  }

  setCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('user'));
    this.employeeService.setCurrentUser(user);
  }

}

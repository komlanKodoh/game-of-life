import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading =  false;
  error = "";

  constructor(
    private router : Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.loginForm = formBuilder.group({
      username: 'a',
      password: 'a',
    });
  }

  ngOnInit(): void {}

  async login() {
    this.error = "";
    this.isLoading = true;

    this.error = await this.userService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    ) || "";

    this.isLoading = false

    if ( !this.error ) this.router.navigate(["/"]);

    return false;
  }
}
``;

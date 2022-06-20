import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent implements OnInit {
  singInForm: FormGroup;
  isLoading = false;
  error = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.singInForm = formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  async register() {
    this.isLoading = true;
    this.error = "";

    this.error = await this.userService.createUser(
      this.singInForm.controls['username'].value,
      this.singInForm.controls['password'].value
    ) || "" ;

    if ( !this.error ) this.error = await this.userService.login(
      this.singInForm.controls['username'].value,
      this.singInForm.controls['password'].value
    ) || "" ;

    this.isLoading = false;

     if ( !this.error ) this.router.navigate(["/"]);
  }
}

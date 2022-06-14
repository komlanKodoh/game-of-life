import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.loginForm = formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  login() {
    const error = this.userService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    );

    return false;
  }
}
``;

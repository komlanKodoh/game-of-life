import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent implements OnInit {
  singInForm: FormGroup;

  constructor(
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
    await this.userService.createUser(
      this.singInForm.controls['username'].value,
      this.singInForm.controls['password'].value
    );

    await this.userService.login(
      this.singInForm.controls['username'].value,
      this.singInForm.controls['password'].value
    );
  }
}

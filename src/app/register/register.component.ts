import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../Services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  login: boolean = false

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl,
        lastName: new FormControl,
        userName: new FormControl(),
        password: new FormControl(),
        passwordCheck: new FormControl()
      }
    )
  }

  onSubmit() {
    console.log("userName: " + this.registerForm.value.userName.value + " password: " + this.registerForm.value.password.value)
    /*this.loginService.Login(this.loginForm.value)
    .subscribe(result => console.log(result))*/
    this.login = true;
  }

}

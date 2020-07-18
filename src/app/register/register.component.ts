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
  registerMsg: string = ""
  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstname: new FormControl,
        lastname: new FormControl,
        username: new FormControl(),
        password: new FormControl(),
        passwordcheck: new FormControl()
      }
    )
  }

  onSubmit() {
    console.log("userName: " + this.registerForm.value.username + " password: " + this.registerForm.value.password)
    /*this.loginService.Login(this.loginForm.value)
    .subscribe(result => console.log(result))*/
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { RegisterService } from '../Services/register.service';
import { User } from '../DTO/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  registerMsg: string = ""
  errorMsg: string = ""
  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstname: new FormControl,
        lastname: new FormControl,
        username: new FormControl('', [Validators.required, Validators.minLength(2)]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        passwordcheck: new FormControl('', [])
      },
      { validators: passwordErrorValidator }
    )
  }

  onSubmit() {
    var userForm = this.registerForm.value
    console.log("userName: " + userForm.username + " password: " + userForm.password)
    if (userForm.password == userForm.passwordcheck) {
      var user = new User(userForm.firstname, userForm.lastname,
        userForm.username, userForm.password, [], [], [])
      this.registerService.register(user).subscribe(
        result => {
          if (result.status == "OK") {
            this.router.navigate(['/home'])
          } else {
            this.errorMsg = result.message
          }
        }
      )
    } else {
      this.errorMsg = "password are not the same as password check"
    }
  }
}


const passwordErrorValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('passwordcheck');
  return password.value != repeatPassword.value ? { 'passwordError': true } : null;
};
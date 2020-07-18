import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  constructor(private registerService: RegisterService,private router: Router ) { }

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
    var userForm = this.registerForm.value
    console.log("userName: " + userForm.username + " password: " + userForm.password)
    if(userForm.password == userForm.passwordcheck){
      var user = new User(userForm.firstname, userForm.lastname, 
        userForm.username,userForm.password,[],[],[])
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
      this.errorMsg ="password are not the same as password check"
    }
  }

}

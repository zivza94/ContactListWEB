import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { SharedDataService } from '../Services/shared-data.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loggedIn: boolean = false
  errorMsg: string = ""
  userName: string

  constructor(private loginService: LoginService, private sharedDataService: SharedDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(
      msg => this.userName = msg
    )

    this.loginService.isAuthenticated().pipe(
      map(aut => {
        if(aut){
          this.router.navigate(['/home'])
        }
      })
    )
    this.loginForm = new FormGroup(
      {
        username: new FormControl(),
        password: new FormControl()
      }
    )
    
  }
  onSubmit() {
    /*
    //console.log("userName: " + this.loginForm.value.userName.value + " password: " + this.loginForm.value.password.value)
    console.log(this.loginForm.value);
    console.log(this.loginForm.value.username);
    /*this.loginService.Login(this.loginForm.value)
    .subscribe(result => console.log(result))
    this.login = true;
    */

    this.loginService.Login(this.loginForm.value.username, this.loginForm.value.password).
      subscribe(result => {
        if (result.status == "OK") {
          this.router.navigate(['/home'])
        } else {
          this.errorMsg = result.message
        }
      })
  }
}

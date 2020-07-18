import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DTO/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean = false
  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  constructor(private commService: CommService) { }
  Login(userName: string, password: string): Observable<LoginResponse> {
    this.commService.Login(userName, password).
      subscribe(result => {
        if (result.status != "OK") {
          this.loggedIn = false;
          console.log("not okay");
        } else {
          this.loggedIn = true;
          console.log("okay");
        }
      })
    return this.commService.Login(userName, password)
  }

}

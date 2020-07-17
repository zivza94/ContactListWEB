import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DTO/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated(): boolean {
    return true
  }

  constructor(private commService: CommService) { }
  Login(userName:string,password:string): Observable<LoginResponse> {
    return this.commService.Login(userName,password)
  }

}

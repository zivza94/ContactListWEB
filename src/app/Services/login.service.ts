import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DTO/login-response';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private commService: CommService) {
  }
  Login(userName: string, password: string): Observable<LoginResponse> {
    return this.commService.Login(userName, password)
  }
  isAuthenticated(userName: string): Observable<Boolean> {
    return this.commService.isAuthenticated(userName)
  }
}

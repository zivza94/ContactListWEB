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
  Login(value: any): Observable<LoginResponse> {
    return this.commService.Login(value)
  }

}

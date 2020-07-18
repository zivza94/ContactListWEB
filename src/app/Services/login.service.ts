import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DTO/login-response';
import { SharedDataService } from './shared-data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userName:string

  constructor(private commService: CommService,private sharedDataService:SharedDataService) {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName =msg)
  }
  Login(userName: string, password: string): Observable<LoginResponse> {
    return this.commService.Login(userName, password).pipe(
      map(response => {
        if(response.status ==="OK"){
          this.sharedDataService.changeMessage(userName)
        }
        return response
      })
    )
  }
  isAuthenticated(): Observable<Boolean> {
    return this.commService.isAuthenticated(this.userName)
  }
}

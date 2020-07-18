import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { SharedDataService } from './shared-data.service';
import { RegisterResponse } from '../DTO/register-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../DTO/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  userName:string
  constructor(private commService:CommService,private sharedDataService:SharedDataService) { 
    this.sharedDataService.currentMessage.subscribe(msg => this.userName =msg)
  }

  register(user:User): Observable<RegisterResponse> {
    return this.commService.Register(user).pipe(
      map(response => {
        if(response.status ==="OK"){
          this.sharedDataService.changeMessage(user.username)
          this.userName = user.username
        }
        return response
      })
    )
  }

}

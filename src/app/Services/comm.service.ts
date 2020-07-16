import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DTO/login-response';
import { Contact } from '../DTO/contact';

@Injectable({
  providedIn: 'root'
})
export abstract class CommService {

  constructor() { }
  abstract Login(value: any): Observable<LoginResponse>
  abstract getContacts(userName: string): Observable<Array<Contact>>
}

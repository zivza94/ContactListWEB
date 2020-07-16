import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DTO/login-response';
import { Contact } from '../DTO/contact';
import { RegisterResponse } from '../DTO/register-response';

@Injectable({
  providedIn: 'root'
})
export abstract class CommService {
  //register
  abstract Register(value:any):Observable<RegisterResponse>
  //login
  abstract Login(value: any): Observable<LoginResponse>
  //contacts
  abstract getContacts(userName: string): Observable<Map<number,Contact>>
  abstract UpdateContact(contact:Contact)
  abstract AddContact(contact:Contact)
  abstract DeleteContact(contact:Contact)

  //groups
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DTO/login-response';
import { Contact } from '../DTO/contact';
import { RegisterResponse } from '../DTO/register-response';
import { User } from '../DTO/user';
import { Group } from '../DTO/groups';

@Injectable({
  providedIn: 'root'
})
export abstract class CommService {
  //register
  abstract Register(user:User):Observable<RegisterResponse>
  //login
  abstract Login(userName:string,password:string): Observable<LoginResponse>
  abstract isAuthenticated(userName:string):Observable<Boolean>
  //contacts
  abstract GetContacts(userName: string): Observable<Array<Contact>>
  abstract UpdateContact(userName:string, contact: Contact)
  abstract AddContact(userName:string,contact: Contact)
  abstract DeleteContact(userName:string,contact: Contact)

  //groups
  abstract GetGroups(userName:string):Observable<Array<Group>>
  abstract UpdateGroup(userName:string, group: Group)
  abstract AddGroup(userName:string,group: Group)
  abstract DeleteGroup(userName:string,group: Group)

}

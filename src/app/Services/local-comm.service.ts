import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../DTO/register-response';
import { LoginResponse } from '../DTO/login-response';
import { Contact } from '../DTO/contact';
import { RepositoryService } from './repository.service';
import { User } from '../DTO/user';
import { Group } from '../DTO/groups';

@Injectable({
  providedIn: 'root'
})
export class LocalCommService extends CommService {
  
  constructor(private repositoryService:RepositoryService) {
    super();
  }

  //register
  Register(user:User):Observable<RegisterResponse> {
    return new Observable<RegisterResponse>(
      subscriber=>
      subscriber.next(this.repositoryService.Register(user))
    )
  } 
  //login
  Login(userName:string,password:string): Observable<LoginResponse> {
    return new Observable<LoginResponse> (
      subscriber =>
      subscriber.next(this.repositoryService.Login(userName,password))
    )
  }
  isAuthenticated(userName:string): Observable<Boolean> {
    return new Observable<Boolean>(
      subscriber =>
      subscriber.next(this.repositoryService.isAuthenticated(userName))
    )
  }

  //contacts
  GetContacts(userName: string): Observable<Array<Contact>> {
    return new Observable<Array<Contact>> (
      subscriber => 
      subscriber.next(this.repositoryService.GetContacts(userName)))
  }
  UpdateContact(userName:string, contact: Contact) {
    this.repositoryService.UpdateContact(userName,contact)
  }
  AddContact(userName:string,contact: Contact) {
    this.repositoryService.AddContact(userName,contact)
  }
  DeleteContact(userName:string,contact: Contact) {
    this.repositoryService.DeleteContact(userName,contact)
  }
  //groups
  GetGroups(userName: string): Observable<Array<Group>> {
    return new Observable<Array<Group>> (
      subscriber => 
      subscriber.next(this.repositoryService.GetGroups(userName)))
  }
  UpdateGroup(userName: string, group: Group) {
    this.repositoryService.UpdateGroup(userName,group)
  }
  AddGroup(userName: string, group: Group) {
    this.repositoryService.AddGroup(userName,group)
  }
  DeleteGroup(userName: string, group: Group) {
    this.repositoryService.DeleteGroup(userName,group)
  }
  
  
}

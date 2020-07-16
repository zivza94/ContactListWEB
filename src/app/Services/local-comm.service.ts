import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../DTO/register-response';
import { LoginResponse } from '../DTO/login-response';
import { Contact } from '../DTO/contact';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class LocalCommService extends CommService {
  Register(value: any): Observable<RegisterResponse> {
    throw new Error("Method not implemented.");
  }
  Login(value: any): Observable<LoginResponse> {
    throw new Error("Method not implemented.");
  }
  getContacts(userName: string): Observable<Map<number,Contact>> {
    return new Observable<Map<number,Contact>> (
      subscriber => 
      subscriber.next(this.repositoryService.GetContacts(userName)))
  }
  UpdateContact(contact: Contact) {
    this.repositoryService.UpdateContact(contact)
  }
  AddContact(contact: Contact) {
    this.repositoryService.AddContact(contact)
  }
  DeleteContact(contact: Contact) {
    throw new Error("Method not implemented.");
  }

  constructor(private repositoryService:RepositoryService) {
    super();
  }
}

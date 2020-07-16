import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../DTO/contact';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  getContacts(userName: string): Observable<Map<number,Contact>> {
    return this.commService.getContacts(userName)
  }
  updateContact(contact:Contact){
    this.commService.UpdateContact(contact)
  }
  addContact(contact:Contact){
    this.commService.AddContact(contact)
  }
  constructor(private commService: CommService) { }
}

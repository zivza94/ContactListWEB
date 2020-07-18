import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../DTO/contact';
import { CommService } from './comm.service';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  userName:string
  getContacts(userName:string): Observable<Array<Contact>> {
    return this.commService.GetContacts(userName)
  }
  updateContact(userName:string,contact:Contact){
    this.commService.UpdateContact(userName,contact)
  }
  addContact(userName:string,contact:Contact){
    this.commService.AddContact(userName,contact)
  }
  deleteContact(userName:string,contact:Contact){
    this.commService.DeleteContact(userName,contact)
  }
  constructor(private commService: CommService, private sharedDataService:SharedDataService) {
   }
}

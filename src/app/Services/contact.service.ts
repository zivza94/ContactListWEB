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
  getContacts(): Observable<Array<Contact>> {
    return this.commService.GetContacts(this.userName)
  }
  updateContact(contact:Contact){
    this.commService.UpdateContact(this.userName,contact)
  }
  addContact(contact:Contact){
    this.commService.AddContact(this.userName,contact)
  }
  deleteContact(contact:Contact){
    this.commService.DeleteContact(this.userName,contact)
  }
  constructor(private commService: CommService, private sharedDataService:SharedDataService) {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
   }
}

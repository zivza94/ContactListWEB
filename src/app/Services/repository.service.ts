import { Injectable } from '@angular/core';
import { Contact } from '../DTO/contact';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  contacts:Map<number,Contact> = new Map()
  //contacts:Array<Contact> = new Array<Contact>()
  constructor() {
    var contact1 = new Contact(1, "ziv", [], null)
    var contact2 = new Contact(2, "david", [], null)
    var contact3 = new Contact(3, "ash", [], null)
    contact1.address = "haifa,Israel"
    contact1.mobile.push("0542559492")
    contact1.mobile.push("0542559492")
    this.contacts[contact1.id] = (contact1)
    this.contacts[contact2.id] = (contact2)
    this.contacts[contact3.id] = (contact3)
    var contact1 = new Contact(4,"bob",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(5,"avi",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(6,"alice",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(7,"nathan",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(8,"rob",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(9,"lid",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(10,"dam",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(11,"van",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(12,"madam",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(13,"lona",[],null)
    this.contacts[contact1.id] = (contact1)
    var contact1 = new Contact(14,"yolo",[],null)
    this.contacts[contact1.id] = (contact1)
    
   }
  GetContacts(userName:string): Map<number,Contact>{
    return this.contacts
  }
  UpdateContact(contact:Contact){
    this.contacts[contact.id] = contact
  }
  AddContact(contact:Contact){
    contact.id = this.generateID(contact.name)
    this.contacts[contact.id] = contact
  }
  generateID(name:string):number{
    var id:number = name.length + this.contacts.size + name.length*this.contacts.size
    return id
  }

}

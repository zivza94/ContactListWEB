import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../DTO/groups';
import { Contact } from '../DTO/contact';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  private massageSource = new BehaviorSubject<string>("admin")
  currentMessage = this.massageSource.asObservable()
  changeMessage(message: string) {
    this.massageSource.next(message)
  }

  private groupsSource = new BehaviorSubject<Array<Group>>([])
  currentGroups = this.groupsSource.asObservable()
  changeGroups(groups: Array<Group>) {
    this.groupsSource.next(groups)
  }

  private groupSource = new BehaviorSubject<Group>(null)
  currentGroup = this.groupSource.asObservable()
  changeGroup(group: Group) {
    this.groupSource.next(group)
  }
  private contactsSource = new BehaviorSubject<Array<Contact>>([])
  currentContacts = this.contactsSource.asObservable()
  changeContacts(contacts: Array<Contact>) {
    this.contactsSource.next(contacts)
  }
  private contactSource = new BehaviorSubject<Contact>(null)
  currentContact = this.contactSource.asObservable()
  changeContact(contact: Contact) {
    this.contactSource.next(contact)
  }
}

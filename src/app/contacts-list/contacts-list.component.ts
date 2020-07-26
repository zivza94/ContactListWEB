import { Component, OnInit } from '@angular/core';
import { ContactService } from '../Services/contact.service';
import { Contact } from '../DTO/contact';
import { Router } from '@angular/router';
import { SharedDataService } from '../Services/shared-data.service';
import { Group } from '../DTO/groups';
import { GroupsService } from '../Services/groups.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsComponent implements OnInit {
  userName: string
  contacts: Array<Contact> = new Array<Contact>()
  groups: Array<Group> = new Array<Group>()
  selectedContact: Contact

  constructor(private contactService: ContactService,
    private route: Router, private sharedDataService: SharedDataService,
    private groupService: GroupsService) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
    this.getcontacts()
    this.getGroups()
  }
  getcontacts() {
    this.contactService.getContacts(this.userName)
      .subscribe(contacts =>{
        this.contacts = contacts
        this.sharedDataService.changeContacts(contacts)
      })
  }
  getGroups() {
    this.groupService.getGroups(this.userName).subscribe(
      groups => {
        this.groups = groups
        this.sharedDataService.changeGroups(groups)
    })
  }
  onSelect(contact: Contact): void {
    this.selectedContact = contact;
  }
  removeContact(contact: Contact): void {
    this.selectedContact = null;
    this.contactService.deleteContact(this.userName,contact)
    this.getcontacts();
    console.log("remove " + contact.name);
  }
  editContact(contact: Contact): void {
    this.sharedDataService.changeContact(contact)
    console.log("Clicked edit contact" + contact.name);
    this.route.navigate(['/updatecontact'])
  }
}


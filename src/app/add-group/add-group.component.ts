import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Contact } from '../DTO/contact';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  groupForm: FormGroup
  contacts: Array<Contact> = new Array<Contact>()
  constructor() {
    var contact1 = new Contact(1, "ziv", [], null)
    var contact2 = new Contact(2, "david", [], null)
    var contact3 = new Contact(3, "ash", [], null)
    this.contacts.push(contact1)
    this.contacts.push(contact2)
    this.contacts.push(contact3)
  }

  ngOnInit(): void {
    this.groupForm = new FormGroup(
      {
        groupName: new FormControl
      })
  }
  addGroup() {
  }

  onSubmit() {
  }
}

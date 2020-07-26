import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../Services/groups.service';
import { SharedDataService } from '../Services/shared-data.service';
import { Location } from '@angular/common'
import { Group } from '../DTO/groups';
import { Router } from '@angular/router';
import { ContactService } from '../Services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../DTO/contact';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit {
  userName: string
  group: Group
  groupForm: FormGroup
  contacts: Array<Contact> = new Array<Contact>()
  selectedContacts: Array<Contact> = new Array<Contact>()
  constructor(private contactService: ContactService,
    private router: Router, private sharedDataService: SharedDataService,
    private groupService: GroupsService, private location: Location) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
    this.sharedDataService.currentGroup.subscribe(msg => this.group = msg)
    this.getcontacts()
    this.groupForm = new FormGroup(
      {
        groupName: new FormControl(this.group.groupName, [Validators.required])
      })
  }

  getcontacts() {
    this.contactService.getContacts(this.userName)
      .subscribe(contacts =>
        this.contacts = contacts)
  }

  onSubmit() {
    console.log(this.selectedContacts)
    var newGroup = new Group(this.group.groupID, this.groupForm.get('groupName').value, this.selectedContacts);
    this.groupService.updateGroup(this.userName, newGroup);
    this.router.navigate(['/groups'])
  }

  onCancel() {
    console.log("cancel")
    this.location.back()
  }

  OnCheckBoxSelect(contact, event) {
    if (event.target.checked === true) {
      this.selectedContacts.push(contact);
    }
    if (event.target.checked === false) {
      this.selectedContacts = this.selectedContacts.filter((contact) => contact !== contact);
    }
  }

}

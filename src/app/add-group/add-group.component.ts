import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../DTO/contact';
import { ContactService } from '../Services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../Services/groups.service';
import { SharedDataService } from '../Services/shared-data.service';
import { Group } from '../DTO/groups';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  groupForm: FormGroup
  userName: string
  contacts: Array<Contact> = new Array<Contact>()
  selectedContacts: Array<Contact> = new Array<Contact>()
  constructor(private contactService: ContactService,
    private router: Router, private sharedDataService: SharedDataService,
    private groupService: GroupsService) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
    this.getcontacts()
    this.groupForm = new FormGroup(
      {
        groupName: new FormControl('', [Validators.required])
      })
  }

  getcontacts() {
    this.contactService.getContacts(this.userName)
      .subscribe(contacts =>
        this.contacts = contacts)
  }

  OnCheckBoxSelect(contact, event) {
    if (event.target.checked === true) {
      this.selectedContacts.push(contact);
    }
    if (event.target.checked === false) {
      this.selectedContacts = this.selectedContacts.filter((contact) => contact !== contact);
    }
  }

  onSubmit() {
    var group = new Group(0, this.groupForm.get('groupName').value, this.selectedContacts);
    this.groupService.addGroup(this.userName, group);
    this.router.navigate(['/groups'])
  }

}

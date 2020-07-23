import { Component, OnInit } from '@angular/core';
import { Contact } from '../DTO/contact';
import { ContactService } from '../Services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../Services/shared-data.service';
import { GroupsService } from '../Services/groups.service';
import { Group } from '../DTO/groups';

@Component({
  selector: 'app-groups',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsComponent implements OnInit {

  selectedGroup: Group
  userName: string
  //contacts: Array<Contact> = new Array<Contact>()
  groups: Array<Group> = new Array<Group>()

  public isCollapsed = false;
  constructor(private contactService: ContactService,
    private route: ActivatedRoute, private sharedDataService: SharedDataService,
    private groupService: GroupsService) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
    this.getGroups()
    //this.getcontacts()
    console.log(this.groups[4]);
  }

  getGroups() {
    this.groupService.getGroups(this.userName).subscribe(
      groups => this.groups = groups
    )
  }

  onSelect(group: Group): void {
    this.selectedGroup = group;
  }
  /*
  getcontacts() {
    this.contactService.getContacts(this.userName)
      .subscribe(contacts =>
        this.contacts = contacts)
  } */

}

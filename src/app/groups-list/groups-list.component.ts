import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact } from '../DTO/contact';
import { ContactService } from '../Services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../Services/shared-data.service';
import { GroupsService } from '../Services/groups.service';
import { Group } from '../DTO/groups';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-groups',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsComponent implements OnInit {
  selectedContact:Contact
  selectedGroup: Group
  userName: string
  clickedGroup: string
  //contacts: Array<Contact> = new Array<Contact>()
  groups: Array<Group> = new Array<Group>()

  public isCollapsed = false;
  constructor(private contactService: ContactService,
    private route: ActivatedRoute, private sharedDataService: SharedDataService,
    private groupService: GroupsService) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
    this.getGroups()
  }

  getGroups() {
    this.groupService.getGroups(this.userName).subscribe(
      groups => this.groups = groups
    )
  }

  onSelect(group: Group): void {
    //this.clickedGroup = groupName;
    if (this.selectedGroup === group) {
      this.selectedGroup = null;
    } else {
      this.selectedGroup = group;
    }
  }
  onSelectContact(contact: Contact){
    this.selectedContact = contact
  }

}

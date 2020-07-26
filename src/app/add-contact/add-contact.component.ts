import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommService } from '../Services/comm.service';
import { Location } from '@angular/common'
import { ContactService } from '../Services/contact.service';
import { Contact } from '../DTO/contact';
import { SharedDataService } from '../Services/shared-data.service';
import { Group } from '../DTO/groups';
import { ContactVM } from '../VM/contact-vm';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../Services/groups.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  addContact: ContactVM = new ContactVM
  userName: string
  addContactGroupsArray: Array<Group> = new Array()
  selectedGroup:Group
  @Input() groups:Array<Group>
  
  
  constructor(private contactService: ContactService, private location: Location,
    private sharedDataService: SharedDataService) {
      
     }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
    this.sharedDataService.currentGroups.subscribe(groups => this.groups = groups)
    
    var form = new FormGroup({
      contactname: new FormControl(),//name
      image: new FormControl(),//image
      mobile: new FormArray([]),//mobile
      telephone: new FormArray([]),//telephone
      mail: new FormArray([]),//mail
      website: new FormControl(),//website
      address: new FormControl(),//address
      userName: new FormControl()//userName
    })
    this.addContact.form = form
    this.addContact.groups = new Array<Group>()
    if(this.groups){
      this.addContactGroupsArray = this.groups.filter(gro => this.addContact.groups.indexOf(gro) == -1)
    }
  }

  onImgChose(event) {
    console.log(event)
  }

  onSubmit() {
    console.log("sumbit")
    this.contactService.addContact(this.userName, this.formToContact(this.addContact))
    this.location.back()

  }
  onCancel(){
    console.log("cancel")
    this.location.back()
  }

  add(name: string) {
    console.log("add taped")
    var f: FormArray = this.addContact.form.get(name) as FormArray
    f.push(new FormControl())
  }
  remove(name: string, index: number) {
    console.log("remove taped")
    var f: FormArray = this.addContact.form.get(name) as FormArray
    f.removeAt(index)
  }
  addGroup(group) {
    this.addContact.groups.push(group)
    this.addContactGroupsArray = this.groups.filter(gro => this.addContact.groups.indexOf(gro) == -1)
  }
  removeGroup(group) {
    this.addContact.groups = this.addContact.groups.filter(gro => gro.groupID != group.groupID)
    this.addContactGroupsArray = this.groups.filter(gro => this.addContact.groups.indexOf(gro) == -1)
  }

  
  formToContact(cont:ContactVM): Contact {
    var contact = new Contact(0, cont.form.get('contactname').value, cont.groups, cont.form.get('image').value)
    contact.mobile = cont.form.get('mobile').value
    contact.telephone = cont.form.get('telephone').value
    contact.mail = cont.form.get('mail').value
    contact.address = cont.form.get('address').value
    contact.website = cont.form.get('website').value
    contact.userName = cont.form.get('userName').value
    return contact
  }
  get mobile(): FormArray {
    return this.addContact.form.get('mobile') as FormArray;
  }
  get mail(): FormArray {
    return this.addContact.form.get('mail') as FormArray;
  }
  get telephone(): FormArray {
    return this.addContact.form.get('telephone') as FormArray;
  }
}

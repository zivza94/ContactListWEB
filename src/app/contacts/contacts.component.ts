import { Component, OnInit } from '@angular/core';
import { ContactService } from '../Services/contact.service';
import { Contact } from '../DTO/contact';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { SharedDataService } from '../Services/shared-data.service';
import { Group } from '../DTO/groups';
import { GroupsService } from '../Services/groups.service';
import { ContactVM } from '../VM/contact-vm';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  userName:string
  contacts: Array<Contact> = new Array<Contact>()
  groups: Array<Group> = new Array<Group>()
  selectContact: ContactVM = new ContactVM
  selectContactGroupsArray:Array<Group> = new Array()
  selectedContact: Contact
  selectedid: number = -1
  data: Array<string>
  selectedGroup:Group

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,private sharedDataService:SharedDataService,
    private groupService:GroupsService) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
    this.getcontacts()
    this.getGroups()
  }
  getcontacts() {
    this.contactService.getContacts(this.userName)
      .subscribe(contacts => 
        this.contacts = contacts)
  }
  getGroups(){
    this.groupService.getGroups(this.userName).subscribe(
      groups => this.groups = groups
    )
  }
  showContact(contact: Contact) {
    if (this.selectedid == contact.id) {
      this.selectContact = null
      this.selectedid = -1;
      this.selectedContact = null
      this.selectContactGroupsArray = new Array()
    } else {
      this.selectedContact = contact
      var form = new FormGroup({
        name: new FormControl(contact.name),//name
        //groups: new FormArray([]),//groups
        image: new FormControl(contact.image),//image
        mobile: new FormArray([]),//mobile
        telephone: new FormArray([]),//telephone
        mail: new FormArray([]),//mail
        website: new FormControl(contact.website),//website
        address: new FormControl(contact.address),//address
        userName: new FormControl(contact.userName)//userName
      })
      this.selectContact.form = form
      this.selectContact.groups = contact.groups
      /*var groups = this.selectContact.get("groups") as FormArray
      contact.groups.forEach(element => {
        groups.push(new FormControl(element.groupName))
      });*/
      var mobile = this.selectContact.form.get("mobile") as FormArray
      contact.mobile.forEach(element => {
        mobile.push(new FormControl(element))
      });
      var telephone = this.selectContact.form.get("telephone") as FormArray
      contact.telephone.forEach(element => {
        telephone.push(new FormControl(element))
      });
      var mail = this.selectContact.form.get("mail") as FormArray
      contact.mail.forEach(element => {
        mail.push(new FormControl(element))
      });

      this.selectedid = contact.id
      this.selectContactGroupsArray = this.groups.filter(gro => this.selectContact.groups.indexOf(gro) == -1)
    }
  }
  onSubmit() {
    this.contactService.updateContact(this.userName,this.formToContact(this.selectContact))
    this.getcontacts()
  }
  add(name: string) {
    console.log("add taped")
    var f: FormArray = this.selectContact.form.get(name) as FormArray
    f.push(new FormControl())
  }
  remove(name: string,index:number){
    console.log("add taped")
    var f: FormArray = this.selectContact.form.get(name) as FormArray
    f.removeAt(index)
  }
  addGroup(group){
    this.selectContact.groups.push(group)
    this.selectContactGroupsArray = this.groups.filter(gro => this.selectContact.groups.indexOf(gro) == -1)
  }
  removeGroup(group){
    this.selectContact.groups = this.selectedContact.groups.filter(gro => gro.groupID != group.groupID)
    this.selectContactGroupsArray = this.groups.filter(gro => this.selectContact.groups.indexOf(gro) == -1)
  }
  /*get contactsArray():Array<Contact>{  
    var values = Object.values(this.contacts)
    var contArray = Array.from(values)
    return contArray
  }*/
  get mobile(): FormArray {
    return this.selectContact.form.get('mobile') as FormArray;
  }
  /*get groups(): FormArray {
    return this.selectContact.get('groups') as FormArray;
  }*/
  get mail(): FormArray {
    return this.selectContact.form.get('mail') as FormArray;
  }
  get telephone(): FormArray {
    return this.selectContact.form.get('telephone') as FormArray;
  }
  onImgChose(event) {
    console.log(event)
  }
  formToContact(cont:{form:FormGroup,groups:Array<Group>}): Contact{
    var contact = new Contact(this.selectedid,cont.form.get('name').value,cont.groups,cont.form.get('image').value)
    contact.mobile = cont.form.get('mobile').value
    contact.telephone = cont.form.get('telephone').value
    contact.mail = cont.form.get('mail').value
    contact.address = cont.form.get('address').value
    contact.website = cont.form.get('website').value
    contact.userName = cont.form.get('userName').value
    return contact
  }
  groupFormArrayToArray(form:FormArray):Array<Group>{
    var groups = new Array<Group>()
    form.controls.forEach(group => groups.push(group.value))
    return groups
  }
}


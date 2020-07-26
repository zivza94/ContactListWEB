import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../DTO/contact';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common'
import { ContactService } from '../Services/contact.service';
import { SharedDataService } from '../Services/shared-data.service';
import { Group } from '../DTO/groups';
import { ContactVM } from '../VM/contact-vm';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {
  @Input() contact: Contact;
  userName:string
  groups:Array<Group>
  updateContact: ContactVM = new ContactVM
  updateContactGroupsArray: Array<Group> = new Array()
  selectedGroup:Group
  constructor(private contactService: ContactService, private location: Location,private sharedDataService:SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
    this.sharedDataService.currentContact.subscribe(contact => this.contact = contact)
    this.sharedDataService.currentGroups.subscribe(groups => this.groups = groups)

    var form = new FormGroup({
      contactname: new FormControl(this.contact.name),//name
      image: new FormControl(this.contact.image),//image
      mobile: new FormArray([]),//mobile
      telephone: new FormArray([]),//telephone
      mail: new FormArray([]),//mail
      website: new FormControl(this.contact.website),//website
      address: new FormControl(this.contact.address),//address
      userName: new FormControl(this.contact.userName)//userName
    })
    var mobile = form.get("mobile") as FormArray
      this.contact.mobile.forEach(element => {
        mobile.push(new FormControl(element))
      });
      var telephone = form.get("telephone") as FormArray
      this.contact.telephone.forEach(element => {
        telephone.push(new FormControl(element))
      });
      var mail = form.get("mail") as FormArray
      this.contact.mail.forEach(element => {
        mail.push(new FormControl(element))
      });
    this.updateContact.form = form
    this.updateContact.groups = this.contact.groups
    if(this.groups){
      this.updateContactGroupsArray = this.groups.filter(gro => this.updateContact.groups.indexOf(gro) == -1)
    }
  }

  onImgChose(event) {
    console.log(event)
  }

  onSubmit() {
    console.log("sumbit")
    this.contactService.updateContact(this.userName,this.formToContact(this.updateContact))
    this.location.back()
  }
  onCancel(){
    console.log("cancel")
    this.location.back()
  }

  add(name: string) {
    console.log("add taped")
    var f: FormArray = this.updateContact.form.get(name) as FormArray
    f.push(new FormControl())
  }
  remove(name: string, index: number) {
    console.log("remove taped")
    var f: FormArray = this.updateContact.form.get(name) as FormArray
    f.removeAt(index)
  }
  addGroup(group) {
    this.updateContact.groups.push(group)
    this.updateContactGroupsArray = this.groups.filter(gro => this.updateContact.groups.indexOf(gro) == -1)
  }
  removeGroup(group) {
    this.updateContact.groups = this.updateContact.groups.filter(gro => gro.groupID != group.groupID)
    this.updateContactGroupsArray = this.groups.filter(gro => this.updateContact.groups.indexOf(gro) == -1)
  }

  formToContact(cont:ContactVM): Contact {
    var contact = new Contact(this.contact.id, cont.form.get('contactname').value, cont.groups, cont.form.get('image').value)
    contact.mobile = cont.form.get('mobile').value
    contact.telephone = cont.form.get('telephone').value
    contact.mail = cont.form.get('mail').value
    contact.address = cont.form.get('address').value
    contact.website = cont.form.get('website').value
    contact.userName = cont.form.get('userName').value
    return contact
  }
  get mobile(): FormArray {
    return this.updateContact.form.get('mobile') as FormArray;
  }
  get mail(): FormArray {
    return this.updateContact.form.get('mail') as FormArray;
  }
  get telephone(): FormArray {
    return this.updateContact.form.get('telephone') as FormArray;
  }
}

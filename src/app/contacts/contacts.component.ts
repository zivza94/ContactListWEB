import { Component, OnInit } from '@angular/core';
import { ContactService } from '../Services/contact.service';
import { Contact } from '../DTO/contact';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { SharedDataService } from '../Services/shared-data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  userName:string
  contacts: Array<Contact> = new Array<Contact>()
  selectContact: FormGroup
  selectedContact: Contact
  selectedid: number = -1
  data: Array<string>
  constructor(private contactService: ContactService,
    private route: ActivatedRoute,private sharedDataService:SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
    this.getcontacts()
  }
  getcontacts() {
    this.contactService.getContacts(this.userName)
      .subscribe(contacts => 
        this.contacts = contacts)
  }
  showContact(contact: Contact) {
    if (this.selectedid == contact.id) {
      this.selectContact = null
      this.selectedid = -1;
      this.selectedContact = null
    } else {
      this.selectedContact = contact
      this.selectContact = new FormGroup({
        name: new FormControl(contact.name),//name
        groups: new FormArray([]),//groups
        image: new FormControl(contact.image),//image
        mobile: new FormArray([]),//mobile
        telephone: new FormArray([]),//telephone
        mail: new FormArray([]),//mail
        website: new FormControl(contact.website),//website
        address: new FormControl(contact.address),//address
        userName: new FormControl(contact.userName)//userName
      })
      var groups = this.selectContact.get("groups") as FormArray
      contact.groups.forEach(element => {
        groups.push(new FormControl(element.groupName))
      });
      var mobile = this.selectContact.get("mobile") as FormArray
      contact.mobile.forEach(element => {
        mobile.push(new FormControl(element))
      });
      var telephone = this.selectContact.get("telephone") as FormArray
      contact.telephone.forEach(element => {
        telephone.push(new FormControl(element))
      });
      var mail = this.selectContact.get("mail") as FormArray
      contact.mail.forEach(element => {
        mail.push(new FormControl(element))
      });

      this.selectedid = contact.id
    }
  }
  onSubmit() {
    this.contactService.updateContact(this.userName,this.formToContact(this.selectContact))
    this.getcontacts()
  }
  add(name: string) {
    console.log("add taped")
    var f: FormArray = this.selectContact.get(name) as FormArray
    f.push(new FormControl())
  }
  remove(name: string,index:number){
    console.log("add taped")
    var f: FormArray = this.selectContact.get(name) as FormArray
    f.removeAt(index)
  }
  /*get contactsArray():Array<Contact>{  
    var values = Object.values(this.contacts)
    var contArray = Array.from(values)
    return contArray
  }*/
  get mobile(): FormArray {
    return this.selectContact.get('mobile') as FormArray;
  }
  get groups(): FormArray {
    return this.selectContact.get('groups') as FormArray;
  }
  get mail(): FormArray {
    return this.selectContact.get('mail') as FormArray;
  }
  get telephone(): FormArray {
    return this.selectContact.get('telephone') as FormArray;
  }
  onImgChose(event) {
    console.log(event)
  }
  formToContact(form:FormGroup): Contact{
    var contact = new Contact(this.selectedid,form.get('name').value,form.get('groups').value,form.get('image').value)
    contact.mobile = form.get('mobile').value
    contact.telephone = form.get('telephone').value
    contact.mail = form.get('mail').value
    contact.address = form.get('address').value
    contact.website = form.get('website').value
    contact.userName = form.get('userName').value
    return contact
  }
}


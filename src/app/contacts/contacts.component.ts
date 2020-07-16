import { Component, OnInit } from '@angular/core';
import { ContactService } from '../Services/contact.service';
import { Contact } from '../DTO/contact';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Array<Contact> = new Array<Contact>()
  selectContact: FormGroup
  selectedContact: Contact
  selectedid: number = 0
  data: Array<string>
  constructor(private contactService: ContactService,
    private route: ActivatedRoute) {
    var contact1 = new Contact(1, "ziv", [], null)
    var contact2 = new Contact(2, "david", [], null)
    var contact3 = new Contact(3, "ash", [], null)
    contact1.address = "haifa,Israel"
    contact1.mobile.push("0542559492")
    contact1.mobile.push("0542559492")
    this.contacts.push(contact1)
    /*var contact1 = new Contact(4,"bob",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(5,"avi",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(6,"alice",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(7,"nathan",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(8,"rob",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(9,"lid",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(10,"dam",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(11,"van",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(12,"madam",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(13,"lona",[],null)
    this.contacts.push(contact1)
    var contact1 = new Contact(14,"yolo",[],null)
    this.contacts.push(contact1)*/
    this.contacts.push(contact2)
    this.contacts.push(contact3)
  }

  ngOnInit(): void {
  }
  getcontacts(userName: string) {
    this.contactService.getContacts(userName)
      .subscribe()
  }
  showContact(contact: Contact) {
    if (this.selectedid == contact.id) {
      this.selectContact = null
      this.selectedid = 0;
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
        groups.push(new FormControl(element))
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
    console.log("contact id:" + this.selectedid +
      "changed to \n" + "name: " + this.selectContact.value.name.value + "\n mobile: " + this.selectContact.value.mobile)
  }
  add(name: string) {
    console.log("add taped")
    var f: FormArray = this.selectContact.get(name) as FormArray
    f.push(new FormControl())
  }
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
}


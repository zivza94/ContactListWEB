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
  contacts: Map<number,Contact> = new Map<number,Contact>()
  selectContact: FormGroup
  selectedContact: Contact
  selectedid: number = 0
  data: Array<string>
  constructor(private contactService: ContactService,
    private route: ActivatedRoute) {
      this.getcontacts("1234");
  }

  ngOnInit(): void {
  }
  getcontacts(userName: string) {
    this.contactService.getContacts(userName)
      .subscribe(contacts => 
        this.contacts = contacts)
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
    this.contactService.updateContact(this.formToContact(this.selectContact))
    console.log("contact id:" + this.selectedid +
      "changed to \n" + "name: " + this.selectContact.value.name.value + "\n mobile: " + this.selectContact.value.mobile)
  }
  add(name: string) {
    console.log("add taped")
    var f: FormArray = this.selectContact.get(name) as FormArray
    f.push(new FormControl())
  }
  get contactsArray():Array<Contact>{
    /*var contArray = new Array<Contact>()
    this.contacts.forEach((contact,id) => contArray.push(contact))
    return contArray*/
    var values = Object.values(this.contacts)
    //while(values.next().value)
    var contArray = Array.from(values)
    return contArray
    //return this.contacts.forEach(contact => )
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
  formToContact(form:FormGroup): Contact{
    var contact = new Contact(this.selectedid,form.get('name').value,form.get('groups').value,form.get('image').value)
    contact.address = form.get('address').value
    contact.mobile = form.get('mobile').value
    contact.telephone = form.get('telephone').value
    contact.website = form.get('website').value
    contact.userName = form.get('userName').value
    return contact
  }
}


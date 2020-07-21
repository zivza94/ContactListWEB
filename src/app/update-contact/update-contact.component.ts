import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../DTO/contact';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common'
import { ContactService } from '../Services/contact.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {
  @Input() contact: Contact;
  updateContact: FormGroup
  constructor(private contactService: ContactService, private location: Location) { }

  ngOnInit(): void {
    this.updateContact = new FormGroup({
      name: new FormControl(this.contact.name),//name
      //groups: new FormArray([]),//groups
      image: new FormControl(this.contact.image),//image
      mobile: new FormArray([]),//mobile
      telephone: new FormArray([]),//telephone
      mail: new FormArray([]),//mail
      website: new FormControl(this.contact.website),//website
      address: new FormControl(this.contact.address),//address
      userName: new FormControl(this.contact.userName)//userName
    })
  }

  onSubmit() {
    console.log("sumbit")
    //this.contactService.addContact(this.userName,this.formToContact(this.addContact))
    this.location.back()
  }
}

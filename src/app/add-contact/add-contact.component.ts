import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommService } from '../Services/comm.service';
import {Location} from '@angular/common'
import { ContactService } from '../Services/contact.service';
import { Contact } from '../DTO/contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  addContact: FormGroup
  constructor(private contactService:ContactService, private location:Location) { }

  ngOnInit(): void {
    this.addContact = new FormGroup({
      name: new FormControl("",Validators.required),//name
      groups: new FormArray([]),//groups
      image: new FormControl(),//image
      mobile: new FormArray([]),//mobile
      telephone: new FormArray([]),//telephone
      mail: new FormArray([]),//mail
      website: new FormControl(),//website
      address: new FormControl(),//address
      userName: new FormControl()//userName
    })
  }

  onImgChose(event) {
    console.log(event)
  }

  onSubmit() {
    console.log("sumbit")
    //this.contactService.addContact(this.userName,this.formToContact(this.addContact))
    this.location.back()
  }

  add(name: string) {
    console.log("add taped")
    var f: FormArray = this.addContact.get(name) as FormArray
    f.push(new FormControl())
  }

  formToContact(form:FormGroup): Contact{
    var contact = new Contact(0,form.get('name').value,form.get('groups').value,form.get('image').value)
    contact.address = form.get('address').value
    contact.mobile = form.get('mobile').value
    contact.telephone = form.get('telephone').value
    contact.website = form.get('website').value
    contact.userName = form.get('userName').value
    return contact
  }
  get mobile(): FormArray {
    return this.addContact.get('mobile') as FormArray;
  }
  get groups(): FormArray {
    return this.addContact.get('groups') as FormArray;
  }
  get mail(): FormArray {
    return this.addContact.get('mail') as FormArray;
  }
  get telephone(): FormArray {
    return this.addContact.get('telephone') as FormArray;
  }
}

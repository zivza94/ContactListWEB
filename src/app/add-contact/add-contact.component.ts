import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  addContact: FormGroup
  constructor() { }

  ngOnInit(): void {
    this.addContact = new FormGroup({
      name: new FormControl(),//name
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
  }

  add(name: string) {
    console.log("add taped")
    var f: FormArray = this.addContact.get(name) as FormArray
    f.push(new FormControl())
  }
}

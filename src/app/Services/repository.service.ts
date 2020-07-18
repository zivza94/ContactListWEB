import { Injectable } from '@angular/core';
import { Contact } from '../DTO/contact';
import { User } from '../DTO/user';
import { RegisterResponse } from '../DTO/register-response';
import { LoginResponse } from '../DTO/login-response';
import { Group } from '../DTO/groups';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  //contacts:Map<number,Contact> = new Map()
  users: Map<string, User> = new Map()

  //contacts:Array<Contact> = new Array<Contact>()
  constructor() {
    var contacts = new Map<number, Contact>()
    var admin: User = new User("admin", "admin", [], [], [0, 0])
    this.Register(admin)
    var contact1 = new Contact(1, "ziv", [], null)
    var contact2 = new Contact(2, "david", [], null)
    var contact3 = new Contact(3, "ash", [], null)
    contact1.address = "haifa,Israel"
    contact1.mobile.push("0542559492")
    contact1.mobile.push("0542559492")
    this.AddContact("admin", contact1)
    this.AddContact("admin", contact2)
    this.AddContact("admin", contact3)

    var contact1 = new Contact(4, "bob", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(5, "avi", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(6, "alice", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(7, "nathan", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(8, "rob", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(9, "lid", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(10, "dam", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(11, "van", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(12, "madam", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(13, "lona", [], null)
    this.AddContact("admin", contact1)
    var contact1 = new Contact(14, "yolo", [], null)
    this.AddContact("admin", contact1)
  }
  //Contacts
  GetContacts(userName: string): Array<Contact> {
    return this.users[userName].contacts
  }
  UpdateContact(userName: string, contact: Contact) {
    var contacts = this.users[userName].contacts
    var newCon = contacts.filter(con => con.id !== contact.id)
    newCon.push(contact)
    this.users[userName].contacts = newCon
  }
  AddContact(userName: string, contact: Contact) {
    contact.id = this.users[userName].idsConter[0]
    this.users[userName].idsConter[0]++
    this.users[userName].contacts.push(contact)
  }
  DeleteContact(userName: string, contact: Contact) {
    var newArray = this.users[userName].contacts.filter(con => con.id !== contact.id)
    this.users[userName].contacts = newArray
  }
  /*generateID(userName:string,name:string):number{
    var id:number = name.length + this.users.get(userName).contacts.size + this.users.get(userName).contacts.size
    return id
  }*/
  // Register
  Register(user: User): RegisterResponse {
    var retval = new RegisterResponse("OK", " register seccessfully")
    if (this.users.has(user.username)) {
      retval.status = "Invalid"
      retval.message = "User name is already taken"
      return retval
    }
    this.users[user.username] = new User(user.username, user.password, [], [], [0, 0])
    return retval
  }
  // Login
  Login(userName: string, password: string): LoginResponse {
    var retval = new LoginResponse("Invalid", "Wrong userName or Password")
    console.log(this.users.has("admin"));
    if (userName in this.users) {
      var user = this.users[userName]
      console.log(user.password);
      console.log(password);
      if (user.password == password) {
        retval.status = "OK"
        retval.message = "Login successfully"
      }
    }
    return retval

  }


  //gruops
  GetGroups(userName: string): Array<Group> {
    return this.users[userName].groups
  }
  AddGroup(userName: string, group: Group) {
    group.groupID = this.users[userName].idsConter[0]
    this.users[userName].idsConter[1]++
    this.users[userName].groups.push(group)
  }
  DeleteGroup(userName: string, group: Group) {
    var newArray = this.users[userName].groups.filter(el => el.groupID !== group.groupID)
    this.users[userName].groups = newArray
  }
  UpdateGroup(userName: string, group: Group) {
    var groups = this.users[userName].groups
    var newGroup = groups.filter(gr => gr.groupID !== group.groupID)
    newGroup.push(group)
    this.users[userName].groups = newGroup
  }

}

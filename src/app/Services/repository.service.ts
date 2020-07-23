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
  loginUsers: Array<string> = new Array()

  //contacts:Array<Contact> = new Array<Contact>()
  constructor() {
    var contacts = new Map<number, Contact>()
    var admin: User = new User("admin", "user", "admin", "admin", [], [], [0, 0])
    this.Register(admin)
    //create the groups
    var group = new Group(0, "1", [])
    this.AddGroup("admin", group)
    var group = new Group(1, "2", [])
    this.AddGroup("admin", group)
    var group = new Group(2, "3", [])
    this.AddGroup("admin", group)
    var group = new Group(3, "4", [])
    this.AddGroup("admin", group)
    //create the contacts
    var contact1 = new Contact(1, "ziv", [group], null)
    var contact2 = new Contact(2, "david", [], null)
    var contact3 = new Contact(3, "ash", [], null)
    contact1.address = "haifa,Israel"
    contact1.mobile.push("0542559492")
    contact1.mobile.push("0542559492")
    this.AddContact("admin", contact1)

    this.AddContact("admin", contact2)
    this.AddContact("admin", contact3)

    var group = new Group(4, "5", [contact1])
    this.AddGroup("admin", group)

    var contact1 = new Contact(4, "bob", [], null)
    this.AddContact("admin", contact1)
    contact1.mail.push("abc@gmail.com")
    contact1.mail.push("a@hotmail.com")
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
    var contacts = this.users[userName].contacts.sort(this.contactSorter)
    return contacts
  }
  UpdateContact(userName: string, contact: Contact) {
    var contacts = this.users[userName].contacts
    // Update the groups
    var oldContact: Contact = contacts.filter(con => con.id === contact.id)[0]
    //add groups
    contact.groups.forEach(group => {
      if (oldContact.groups.indexOf(group) != -1) {
        this.AddContactToGroup(userName, contact, group)
      }
    })
    //remove groups
    oldContact.groups.forEach(group => {
      if (contact.groups.indexOf(group) == -1) {
        this.RemoveContactFromGroup(userName, contact, group)
      }
    })

    var newCon = contacts.filter(con => con.id !== contact.id)
    newCon.push(contact)
    this.users[userName].contacts = newCon
  }
  AddContact(userName: string, contact: Contact) {
    // add the contacts to the contacts of the groups
    contact.groups.forEach(group => this.AddContactToGroup(userName, contact, group))
    //add the contacts to the user
    contact.id = this.users[userName].idsConter[0]
    this.users[userName].idsConter[0]++
    this.users[userName].contacts.push(contact)
  }
  DeleteContact(userName: string, contact: Contact) {
    //remove the contact from the groups
    contact.groups.forEach(group => this.RemoveContactFromGroup(userName, contact, group))
    //remove the contact from the user
    var newArray = this.users[userName].contacts.filter(con => con.id !== contact.id)
    this.users[userName].contacts = newArray
  }
  AddContactToGroup(userName: string, contact: Contact, group: Group) {
    group.contacts.push(contact)
    this.ChangeGroupInUser(userName, group)
  }
  RemoveContactFromGroup(userName: string, contact: Contact, group: Group) {
    var newContacts = group.contacts.filter(con => con.id != contact.id)
    group.contacts = newContacts
    this.ChangeGroupInUser(userName, group)
  }

  private ChangeGroupInUser(userName: string, group: Group) {
    var groups = this.users[userName].groups.filter(gro => gro.groupID !== group.groupID)
    groups.push(group)
    this.users[userName].groups = groups
  }

  /*generateID(userName:string,name:string):number{
    var id:number = name.length + this.users.get(userName).contacts.size + this.users.get(userName).contacts.size
    return id
  }*/
  // Register
  Register(user: User): RegisterResponse {
    var retval = new RegisterResponse("OK", " register seccessfully")
    if (user.username in this.users) {
      retval.status = "Invalid"
      retval.message = "User name is already taken"
      return retval
    }
    this.users[user.username] = new User("", "", user.username, user.password, [], [], [0, 0])
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
        this.loginUsers.push(user.userName)
      }
    }
    return retval

  }

  Logout(userName: string) {
    this.loginUsers = this.loginUsers.filter(usr => usr != userName)
  }
  isAuthenticated(userName: string): Boolean {
    if (userName in this.loginUsers) {
      return true
    }
    return false
  }



  //gruops
  GetGroups(userName: string): Array<Group> {
    return this.users[userName].groups.sort(this.groupSorter)
  }
  AddGroup(userName: string, group: Group) {
    // add the group to contacts
    group.contacts.forEach(contact => this.AddGroupToContact(userName, contact, group))
    group.groupID = this.users[userName].idsConter[1]
    this.users[userName].idsConter[1]++
    this.users[userName].groups.push(group)
  }
  DeleteGroup(userName: string, group: Group) {
    //remove from contacts
    group.contacts.forEach(contact => this.RemoveGroupFromContact(userName, contact, group))
    //delete from user
    var newArray = this.users[userName].groups.filter(el => el.groupID !== group.groupID)
    this.users[userName].groups = newArray
  }
  UpdateGroup(userName: string, group: Group) {
    var groups = this.users[userName].groups

    // Update the contacts
    var oldGroup: Group = groups.filter(gro => gro.groupId === group.groupID)[0]
    //add groups
    group.contacts.forEach(contact => {
      if (oldGroup.contacts.indexOf(contact) != -1) {
        this.AddGroupToContact(userName, contact, group)
      }
    })
    //remove groups
    oldGroup.contacts.forEach(contact => {
      if (group.contacts.indexOf(contact) == -1) {
        this.RemoveContactFromGroup(userName, contact, group)
      }
    })

    var newGroup = groups.filter(gr => gr.groupID !== group.groupID)
    newGroup.push(group)
    this.users[userName].groups = newGroup
  }


  private AddGroupToContact(userName: string, contact: Contact, group: Group) {
    contact.groups.push(group)
    this.ChangeContactInUser(userName, contact)
  }
  private RemoveGroupFromContact(userName: string, contact: Contact, group: Group) {
    var newGroups = contact.groups.filter(gro => gro.groupID != group.groupID)
    contact.groups = newGroups
    this.ChangeContactInUser(userName, contact)
  }
  private ChangeContactInUser(userName: string, contact: Contact) {
    var contacts = this.users[userName].contacts.filter(con => con.id !== contact.id)
    contacts.push(contact)
    this.users[userName].contacts = contacts
  }

  //Sorters
  private contactSorter(a: Contact, b: Contact) {
    return a.name.localeCompare(b.name)
  }
  private groupSorter(a: Group, b: Group) {
    return a.groupName.localeCompare(b.groupName)
  }
}

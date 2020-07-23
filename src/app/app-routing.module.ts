import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups-list/groups-list.component';
import { RegGuardService } from './Services/guards.service';
import { ContactsComponent } from './contacts-list/contacts-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { HomeComponent } from './home/home.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "groups", component: GroupsComponent, canActivate: [RegGuardService] },
  { path: "contacts", component: ContactsComponent, canActivate: [RegGuardService] },
  { path: "addcontact", component: AddContactComponent },
  { path: "addgroup", component: AddGroupComponent },
  { path: "updatecontact", component: UpdateContactComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

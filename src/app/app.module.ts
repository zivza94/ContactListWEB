import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { ContactsComponent } from './contacts-list/contacts-list.component';
import { GroupsComponent } from './groups-list/groups-list.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { CommService } from './Services/comm.service';
import { LocalCommService } from './Services/local-comm.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { FormsModule } from '@angular/forms';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MatCardModule } from '@angular/material/card'
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { UpdateGroupComponent } from './update-group/update-group.component';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    AddGroupComponent,
    ContactsComponent,
    GroupsComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ContactDetailComponent,
    UpdateContactComponent,
    GroupDetailComponent,
    UpdateGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    FontAwesomeModule,
    MatCardModule,
    CdkScrollableModule
  ],
  providers: [{ provide: CommService, useClass: LocalCommService }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../DTO/contact';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  getContacts(userName: string): Observable<Array<Contact>> {
    return this.commService.getContacts(userName);
  }

  constructor(private commService: CommService) { }
}

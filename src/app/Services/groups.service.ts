import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { SharedDataService } from './shared-data.service';
import { Observable } from 'rxjs';
import { Group } from '../DTO/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  userName:string
  constructor(private commService:CommService, private sharedDataService:SharedDataService) { 
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
  }
  getGroups(userName:string):Observable<Array<Group>>{
    return this.commService.GetGroups(userName)
  }
  updateGroup(userName:string,group:Group){
    this.commService.UpdateGroup(userName,group)
  }
  addGroup(userName:string,group:Group){
    this.commService.AddGroup(userName,group)
  }
  deleteGroup(userName:string,group:Group){
    this.commService.DeleteGroup(userName,group)
  }
}

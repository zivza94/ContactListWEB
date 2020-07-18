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
  getGroups():Observable<Array<Group>>{
    return this.commService.GetGroups(this.userName)
  }
  updateGroup(group:Group){
    this.commService.UpdateGroup(this.userName,group)
  }
  addGroup(group:Group){
    this.commService.AddGroup(this.userName,group)
  }
  deleteGroup(group:Group){
    this.commService.DeleteGroup(this.userName,group)
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  public 
  private massageSource = new BehaviorSubject<string>("admin")
  currentMessage = this.massageSource.asObservable()
  changeMessage(message:string){
    this.massageSource.next(message)
  }
}

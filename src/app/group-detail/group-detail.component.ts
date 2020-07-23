import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../DTO/groups';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  @Input() group: Group;
  constructor() { }

  ngOnInit(): void {
  }

}

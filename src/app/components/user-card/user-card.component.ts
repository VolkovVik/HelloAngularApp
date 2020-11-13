import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input('user') user;
  @Output('userSelected') userSelected: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log("ctor", this.user);
  }

  ngOnInit(): void {
    console.log("init", this.user);
  }

  selectUser() {
    this.userSelected.emit();
  }
}

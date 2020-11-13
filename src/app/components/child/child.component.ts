import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  title: string = 'ChildComponent';

  @ViewChild("userName", { static: false })
  nameParagraph: ElementRef;

  @Input() userName: string;

  @Input('user') user: any;
  @Output('userSelected') userSelected: EventEmitter<any> = new EventEmitter;
  @Output() userNameChange = new EventEmitter<string>();

  _userAge: number;
  @Input()
  set userAge(age: number) {
    if (age < 0)
      this._userAge = 0;
    else if (age > 100)
      this._userAge = 100;
    else
      this._userAge = age;
  }
  get userAge() { return this._userAge; }

  constructor() { }
  
  ngOnInit() {
    this.user = { name: "Default", age: 0 }
  }

  onSelectUser(name: string) {
    console.log(name);
    this.userSelected.emit({ name: name });
  }

  onNameChange(model: string) {
    this.userName = model;
    this.userNameChange.emit(model);
  }
}

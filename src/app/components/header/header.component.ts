import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateValueComponent } from '../template-value/template-value.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = 'HeaderComponent';

  public user;
  public selectedUser;

  name: string = "Viktor1";
  age: number = 25;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.user = { name: "Viktor2", age: 27 };
    }, 3000);
  }

  onChanged(user: any) {
    this.selectedUser = user;
  }

  @ViewChild(TemplateValueComponent, { static: false })
  private counterComponent: TemplateValueComponent;

  increment() { this.counterComponent.increment(); }
  decrement() { this.counterComponent.decrement(); }
}

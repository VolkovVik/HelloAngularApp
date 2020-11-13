import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-testing',
  template: `<div>{{user?.name}}</div>`

})
export class TestingComponent {

  public user;

  constructor(private readonly userService: UserService) { }

  method(): void {
    this.userService.getOne(1).subscribe(user => this.user = user);
  }

}

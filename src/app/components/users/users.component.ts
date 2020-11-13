import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users;
  public selectedUser;

  constructor(private readonly userService: UsersService) { }

  ngOnInit(): void {
    this.users = this.userService.getAll();    
  }

  removeUser(name: string) {
    this.userService.remove(name);
    this.users = this.userService.getAll();
  }

  addUser(name: string) {
    if (!name) {
      return;
    }
    this.userService.add(name);
    this.users = this.userService.getAll();
  }

  setRequestGitHub(){
    this.userService.getGithubUsers();
  }

  setRequestJsonplaceholder(){
    this.userService.getJsonplaceholderUsers();
    //this.userService.getAllUser().subscribe(users=>this.users = users);
  }
}

import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpService, User } from 'src/app/services/http/http.service';


@Component({
  selector: 'app-httpmodule',
  templateUrl: './httpmodule.component.html',
  styleUrls: ['./httpmodule.component.scss']
})
export class HttpmoduleComponent implements OnInit {

  error: any;
  users: User[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getUsers().subscribe(
      data => {
        console.log('Next', data);
        this.users = data;
      },
      error => {
        this.error = error.message;
        console.log('Error:', error);
      }
    );
  }

  num1: number;
  num2: number;
  sum: number;
  done: boolean = false;

  submit1() {
    this.httpService.getSum(this.num1, this.num2).subscribe((data: any) => {
      this.sum = data.result;
      this.done = true;
    });
  }

  user: User; // данные вводимого пользователя

  receivedUser: User; // полученный пользователь

  postData() {
    this.httpService.postData().subscribe(
      data =>  console.log(data),
      error => console.log(error)
    );
  }
}

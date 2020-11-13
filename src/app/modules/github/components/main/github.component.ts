import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { strict } from 'assert';
import { stringify } from 'querystring';
import { empty, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';

export interface IUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit, OnDestroy {

  name: FormControl;
  userListControl: FormGroup;
  subscriptions: Subscription[] = [];
  url: string = 'https://api.github.com/search/users?q=';

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.name = new FormControl('volkov', [Validators.required]);
    this.name.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.clearUsersControl()),
        filter(value=>(value as string).length !== 0),
        switchMap(value => fetch(`${this.url}${value}`)
          .then(response => response.json())          
        ),
        map(value => value.items),
        mergeMap(value => value)
      )
      .subscribe((value) => {
        console.log(value);
        this.addUserControl((value as IUser).login, (value as IUser).avatar_url);
      });
    this.name.statusChanges.subscribe((status) => {
      //console.log(this.name.errors);
      //console.log(status);
    });

    this.userListControl = this.formBuilder.group({
      users: this.formBuilder.array([this.createItem()])
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item: Subscription) => { item.unsubscribe(); });
  }

  createItem(login: string = '', image: string = ''): FormGroup {
    return this.formBuilder.group({
      login: login,
      image: image
    });
  }

  getUserControl() {
    return (this.userListControl.controls['users'] as FormArray).controls;
  }

  clearUsersControl() {
    (this.userListControl.controls['users'] as FormArray).clear();
  }  

  addUserControl(name: string, image: string) {
    (this.userListControl.controls['users'] as FormArray).push(this.createItem(`${name}`, `${image}`));
  }
}

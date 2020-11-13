import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface RootObject {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export class User {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private readonly httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/1users').pipe(
      map((data: RootObject[]) => {
        let usersList = data;
        return usersList.map(function (user: RootObject) {
          return new User(user.name, user.id);
        })
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
      }));
  }

  getSum(num1: number, num2: number) {
    const params = new HttpParams()
      .set('num1', num1.toString())
      .set('num2', num2.toString());
    return this.httpClient.get('http://localhost:3000/sum', { params });
  }

  postData() {
    const myHeaders = new HttpHeaders().set('Content-type', 'application/json; charset=UTF-8');
    const body = JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
    return this.httpClient.post('https://jsonplaceholder.typicode.com/posts', body, { headers: myHeaders });
  }
}

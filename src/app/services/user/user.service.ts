import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUser{
  name:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) { }

  public getOne(userId:number): Observable<IUser> {
      return this.httpClient.get<IUser>(`/users/${userId}`);
  }

  public getAll(): Observable<IUser[]>  {
    return this.httpClient.get<IUser[]>(`/users`);
  }
}

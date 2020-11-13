import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

interface IUser {
  name:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<IUser>{

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IUser | Observable<IUser> | Promise<IUser> {
    return of({name:"Victor"});
  }
}

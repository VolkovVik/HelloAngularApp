import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { LogService } from '../log/log.service';

// @Injectable({providedIn: 'root'})       // корневой уровень
// @Injectable({providedIn: DataModule})   // уровень модуля
// @Injectable()                           // уровень компонента

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users = [
    { name: 'Vik' },
    { name: 'Bob' },
    { name: 'Alice' }
  ];

  constructor(
    private readonly httpClient: HttpClient,
    @Optional() private readonly logService: LogService
  ) { }

  public getAll() {
    return this.users;
  }

  public getGithubUsers() {
    this.httpClient.get('https://api.github.com/user').subscribe(result => { console.log(result); });    
  }

  public getJsonplaceholderUsers() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users').subscribe(result => { console.log(result); }); 
  }

  public remove(name: string) {
    this.log(`remove ${name}`);
    return this.users = this.users.filter(user => user.name !== name);
  }

  public add(name: string) {
    this.log(`add ${name}`);
    this.users.push({ name });
  }

  log(message: string) {
    if (this.logService)
      this.logService.write(message);
  }
}

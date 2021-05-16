import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
   
@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
       
    getUsers() : Observable<User[]> {
        return this.http.get('assets/users.json')
        .pipe(
            map( (data: any) =>{
            let usersList = data["userList"];

            return usersList.map(function(user:any) {
                return {name: user.userName, age: user.userAge};
              });
        }));
    }
}
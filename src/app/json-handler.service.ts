import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from './user.model';
import { Product } from './product.model';
import { of } from 'rxjs';
   
@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
       
    public getUsers() : Observable<User[]> {
        return this.http.get('assets/users.json')
        .pipe(
            map( (data: any) =>{
            let usersList = data["userList"];

            return usersList.map(function(user:any) {
                return {name: user.userName, age: user.userAge};
              });
        }));
    }

    public getProducts(): Observable<Product[]>
     {
        return this.http.get('assets/products.json')
        .pipe(
            tap((data:any) => console.log('Products: ', JSON.stringify(data)) ),
            catchError((x) => of(`I caught: ${x}`))
        ) as Observable<Product[]>;
    }
}
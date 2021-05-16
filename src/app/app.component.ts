import { Component } from '@angular/core';
import { range, of, from, throwError, Observable } from 'rxjs';
import {
  map,
  filter,
  first,
  take,
  last,
  tap,
  catchError,
} from 'rxjs/operators';
import { HttpService } from './json-handler.service';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public products$: Observable<Product[]>;

  constructor(private jsonHandler: HttpService) {
    // this.of();
    // this.from();
    // this.range();
    // this.first();
    // this.last();
    // this.take();
    // this.filter();
    // this.map();
    // this.tap();
    this.catchError();

    this.products$ = jsonHandler.getProducts();
    //.subscribe(
    //  x => console.log(x)
    //);
  }

  public of(): void {
    of(1, 2, 3) //of can work with sequence
      .subscribe((x) => console.log('of: ' + x));
    // 1 2 3
  }

  public from(): void {
    from([4, 5, 6]) //from can work with arrays
      .subscribe((x) => console.log('from: ' + x));
    // 4 5 6
  }

  public range(): void {
    range(1, 10).subscribe((x) => console.log('range: ' + x));
    // 1 2 3 4 5 6 7 8 9 10
  }

  //operators

  public first(): void {
    of(1, 2, 3, 4, 5)
      .pipe(first())
      .subscribe((x) => console.log('first: ' + x));
    // 1
  }

  public last(): void {
    of(1, 2, 3, 4, 5)
      .pipe(last())
      .subscribe((x) => console.log('last: ' + x));
    // 5
  }

  public take(): void {
    of(1, 2, 3, 4, 5)
      .pipe(take(2))
      .subscribe((x) => console.log('take 2: ' + x));
    // 1 2
  }

  public filter(): void {
    range(1, 10)
      .pipe(filter((x) => x % 2 === 0))
      .subscribe((x) => console.log('filter x % 2 === 0 : ' + x));
    // 2 4 6 8 10

    range(1, 10)
      .pipe(filter((x) => x > 7))
      .subscribe((x) => console.log('filter x > 7 : ' + x));
    // 8 9 10
  }

  public map(): void {
    range(1, 5)
      .pipe(map((x) => x * 3))
      .subscribe((x) => console.log('map x * 3: ' + x));
    // 3 6 9 12 15
  }

  public tap(): void {
    //usefull for debug
    range(1, 5)
      .pipe(
        tap((x) => console.log('tap before map, value = ' + x)),
        map((x) => x * 3),
        tap((x) => console.log('tap after map, value = ' + x)),
        filter((x) => x > 10)
      )
      .subscribe((x) => console.log('tap: ' + x));

    //tap before
    // 1 2 3 4 5

    //tap after
    // 3 6 9 12 15

    //result
    // 12 15
  }

  public catchError(): void {
    throwError('This is an error!')
    .pipe(
      catchError((x) => of(`I caught: ${x}`))
    )
    .subscribe((x) => console.log('catchError: ' + x));
    // catchError: This is an error! 
  }
}

# Catch and Release

We also have the option of using the `.catch` operator. It allows us to catch errors on an existing stream, do something, and pass the exception onwards.

```typescript
import { HttpClient } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  search(term: string) {
    return this.http.get('https://api.spotify.com/v1/dsds?q=' + term + '&type=artist')
      .pipe(
        map(response => response.json()),
        catchError((e) => {
          return Observable.throw(new Error(`${ e.status } ${ e.statusText }`));
        })
      )
  }
}
```

[View Example](http://plnkr.co/edit/3lCaeI?p=preview)

It also allows us to inspect the error and decide which route to take. For example, if we encounter a server error then use a cached version of the request otherwise re-throw.

```typescript
@Injectable()
export class SearchService {

  ...

  search(term: string) {
    return this.http.get(`https://api.spotify.com/v1/dsds?q=${term}&type=artist`)
      .pipe(
        map(response => response.json()), 
        catchError(e => {
        if (e.status >==  500) {
          return cachedVersion();
        } else {
          return Observable.throw(
            new Error(`${ e.status } ${ e.statusText }`)
          );
        }
      }))
      
  }
}
```


# Requests as Promises

The observable returned by Angular http client can be converted it into a promise.

> We recommend using observables over promises. By converting to a promise you will be lose the ability to cancel a request and the ability to chain RxJS operators.

```typescript
import { HttpClient } from '@angular/http/common';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  search(term: string) {
    return this.http.pipe(
      get(`https://api.spotify.com/v1/search?q=${term}&type=artist`),
      map((response) => response.json())
    ).toPromise();
  }
}
```

We would then consume it as a regular promise in the component.

```typescript
@Component({ /* ... */ })
export class AppComponent {
    /* ... */

    search() {
        this.searchService.search(this.searchField.value)
          .then((result) => {
        this.result = result.artists.items;
      })
      .catch((error) => console.error(error));
    }
}
```


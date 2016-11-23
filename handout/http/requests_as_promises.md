## Requests as Promises

The observable returned by Angular http client can be converted it into a promise.

> We recommend using observables over promises. By converting to a promise you will be lose the ability to cancel a request and the ability to chain RxJS operators.

```ts
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

  constructor(private http: Http) {}

  search(term: string) {
    return this.http
      .get('https://api.spotify.com/v1/search?q=' + term + '&type=artist')
      .map((response) => response.json())
      .toPromise();
  }
}
```

We would then consume it as a regular promise in the component.

```ts
@Component({ /* ... */ })
export class MyApp {
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

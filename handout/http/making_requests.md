## Making HTTP Requests

To make HTTP requests we will use the `Http` service. In this example we are creating a `SearchService` to interact with the Spotify API.

```ts
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: Http) {}

  search(term: string) {
    return this.http
      .get('https://api.spotify.com/v1/search?q=' + term + '&type=artist')
      .map((response) => response.json());
  }
}
```

[View Example](http://plnkr.co/edit/pt9hPJ?p=preview)

Here we are making an HTTP GET request which is exposed to us as an observable. You will notice the `.map` operator chained to `.get`. The `Http` service provides us with the raw response as a string. In order to consume the fetched data we have to convert it to JSON.

In addition to `Http.get()`, there are also `Http.post()`, `Http.put()`, `Http.delete()`, etc. They all return observables.

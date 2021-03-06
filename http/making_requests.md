# Making Requests

To make HTTP requests we will use the `Http` service. In this example we are creating a `SearchService` to interact with the Spotify API.

```typescript
import { HttpClient } from '@angular/http/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  search(term: string) {
    return this.http
      .get('https://api.spotify.com/v1/search?q=' + term + '&type=artist')
      .map(response => response.json());
  }
}
```

[View Example](http://plnkr.co/edit/C8Zv9i?p=preview)

Here we are making an HTTP GET request which is exposed to us as an observable. You will notice the `.map` operator chained to `.get`. The `HttpClient` service provides us with the raw response as a string. In order to consume the fetched data we have to convert it to JSON.

In addition to `HttpClient.get()`, there are also `HttpClient.post()`, `HttpClient.put()`, `HttpClient.delete()`, etc. They all return observables.


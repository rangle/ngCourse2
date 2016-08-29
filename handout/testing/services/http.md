# Testing HTTP Requests

Services, by their nature, perform asynchronous tasks. When we make an HTTP request we do so in an asynchronous manner so as not to block the rest of the application from carrying out its operations. We looked a bit at testing components asynchronously earlier - fortunately a lot of this knowledge carries over into testing services asynchronously.

The basic strategy for testing such a service is to verify the contents of the request being made (correct URL) and ensure that the data we mock into the service is returned correctly by the right method.

Let's take a look at some code:

*wikisearch.ts*

```js
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class SearchWiki {
  constructor (private http: Http) {}

  search(term: string): Observable<any> {
    return this.http.get(
      'https://en.wikipedia.org/w/api.php?' +
      'action=query&list=search&srsearch=' + term
    ).map((response) => response.json());
  }

  searchXML(term: string): Observable<any> {
    return this.http.get(
      'https://en.wikipedia.org/w/api.php?' +
      'action=query&list=search&format=xmlfm&srsearch=' + term
    );
  }
}
```

Here is a basic service. It will query Wikipedia with a search term and return an `Observable` with the results of the query. The search function will make a GET request with the supplied term, and the searchXML method will do the same thing, except request the response to be in XML instead of JSON. As you can see, it depends on the HTTP module to make a request to wikipedia.org.

Our testing strategy will be to check to see that the service has requested the right URL, and once we've responded with mock data we want to verify that it returns that same data.

# Mocking Dependencies

Since we want to isolate our service testing from outside network requests, we have to create mock requests where we can manually setup properties like expected responses, errors, headers, etc. Fortunately Angular 2 makes this an easy process by providing a way to make fake HTTP calls through the MockBackend class. This class can be injected wherever a service is expecting the HTTP module and used by the service as though it were the real HTTP module - except now the results/data setup by us, without any network request taking place. Lets take a look at some code:

*wikisearch.ts*

```js

import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class SearchWiki {
  constructor (private http: Http) {}

  search(term:string): Observable<any> {
    return this.http.get(
      'https://en.wikipedia.org/w/api.php?' +
      'action=query&list=search&srsearch=' + term
    ).map((response) => response.json);
  }

  searchXML(term:string): Observable<any> {
    return this.http.get(
      'https://en.wikipedia.org/w/api.php?' + 
      'action=query&list=search&format=xmlfm&srsearch=' + term
    );
  }
}
```

Here is a basic service. It will query wikipedia with a search term and return an Observable with the results of the query. The search function will make a GET request with the supplied term, and the searchXML method will do the same thing, except request the response to be in XML instead of JSON. As you can see, it depends on the HTTP module to make a request to wikipedia.org. We want to use `MockBackend` to inject a mocked version of Http, so that any call to http.get will allow us to feed in whatever data we want - not the data from wikipedia.org. Lets take a look at our unit test:

*wikisearch.spec.ts*

```js

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  ConnectionBackend,
  Http
} from 'angular2/http';

import {
  it,
  expect,
  describe,
  beforeEachProvider,
  inject
} from 'angular2/testing';

import {MockBackend} from 'angular2/http/testing';
import {provide} from 'angular2/core';
import {SearchWiki} from './wikisearch';

describe('Testing the wikipedia search service', () => {
  beforeEachProviders(() => {
    return [
      MockBackend,
      BaseRequestOptions,
      SearchWiki,
      provide(
        Http, {
          useFactory: (
            mockbackend: ConnectionBackend, 
            defaultOptions: BaseRequestOptions
          ) => {
            return new Http(mockbackend, defaultOptions)
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      )
    ]
  });
});
```

As you can see, we have quite a few imports here to setup our mocked HTTP module. We use `beforeEachProvider` to include `MockBackend` to create our mocked HTTP module. In order to properly setup our mocked module we also include `BaseRequestOptions` and `ConnectionBackend`. We create an instance of `Http` that our service will get by using a factory.

To create this instance the `Http` class take two parameters - the first is the backend to use (it has the type `ConnectionBackend`), and the second is the default options to use (of type `RequestOptions`). Since we are planning to use a mock backend, we feed in `MockBackend` to the first parameter. The second parameter, default options, doesn't have any bearing on the mocking aspects we plan on using, so we use `BaseRequestOptions`, which is the default implementation.

Right now this test doesn't do anything aside from setting up a mockable HTTP module - lets take a look at some actual tests.

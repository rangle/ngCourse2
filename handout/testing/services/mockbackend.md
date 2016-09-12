# Testing HTTP Requests Using MockBackend

To unit test our services, we don't want to make actual HTTP requests. To accomplish this, we need to mock out our HTTP services. Angular 2 provides us with a `MockBackend` class that can be configured to provide mock responses to our requests, without actually making a network request.

The configured `MockBackend` can then be injected into HTTP, so any calls to the service, such as `http.get` will return our expected data, allowing us to test our service in isolation from real network traffic.

*wikisearch.spec.ts*

```js
import {
  fakeAsync,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response,
  RequestMethod
} from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing/mock_backend';

import {SearchWiki} from './wikisearch.service';

const mockResponse = {
  "batchcomplete": "",
  "continue": {
    "sroffset": 10,
    "continue": "-||"
  },
  "query": {
    "searchinfo": {
      "totalhits": 36853
    },
    "search": [{
      "ns": 0,
      "title": "Stuff",
      "snippet": "<span></span>",
      "size": 1906,
      "wordcount": 204,
      "timestamp": "2016-06-10T17:25:36Z"
    }]
  }
};

describe('Wikipedia search service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        SearchWiki
      ]
    });
  });

  it('should get search results', fakeAsync(
    inject([
      XHRBackend,
      SearchWiki
    ], (mockBackend: XHRBackend, searchWiki: SearchWiki) => {

      const expectedUrl = 'https://en.wikipedia.org/w/api.php?' +
        'action=query&list=search&srsearch=Angular';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: mockResponse })
          ));
        });

      searchWiki.search('Angular')
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })
  ));

  it('should set foo with a 1s delay', fakeAsync(
    inject([SearchWiki], (searchWiki: SearchWiki) => {
      searchWiki.setFoo('food');
      tick(1000);
      expect(searchWiki.foo).toEqual('food');
    })
  ));

});
```
[View Example](http://plnkr.co/edit/91Idq9u42SE2xx1cWEmb?p=preview)

We use `inject` to inject the `SearchWiki` service and the `MockBackend` into our test. We then wrap our entire test with a call to `fakeAsync`, which will be used to control the asynchronous behavior of the `SearchWiki` service for testing.

Next, we `subscribe` to any incoming connections from our back-end. This gives us access to an object `MockConnection`, which allows us to configure the response we want to send out from our back-end, as well as test any incoming requests from the service we're testing.

In our example, we want to verify that the `SearchWiki`'s search method makes a GET request to the correct URL. This is accomplished by looking at the request object we get when our `SearchWiki` service makes a connection to our mock back-end. Analyzing the `request.url` property we can see if its value is what we expect it to be. Here we are only checking the URL, but in other scenarios we can see if certain headers have been set, or if certain POST data has been sent.

Now, using the `MockConnection` object we mock in some arbitrary data. We create a new `ResponseOptions` object where we can configure the properties of our response. This follows the format of a regular [Angular 2 Response class](https://angular.io/docs/js/latest/api/http/Response-class.html). Here we have simply set the `body` property to that of a basic search result set you might see from Wikipedia. We could have also set things like cookies, HTTP headers, etc., or set the `status` value to a non-200 state to test how our service responds to errors. Once we have our `ResponseOptions` configured we create a new instance of a `Respond` object and tell our back-end to start using this as a response by calling `.mockRespond`.

It is possible to use multiple responses. Say your service had two possible GET requests - one for `/api/users`, and another `/api/users/1`. Each of these requests has a different corresponding set of mock data. When receiving a new connection through the `MockBackend` subscription, you can check to see what type of URL is being requested and respond with whatever set of mock data makes sense.

Finally, we can test the `search` method of the `SearchWiki` service by calling it and subscribing to the result. Once our search process has finished, we check the result object to see if it contains the same data that we mocked into our back-end. If it is, then congratulations, your test has passed.

In the `should set foo with a 1s delay` test, you will notice that we call `tick(1000)` which simulates a 1 second delay.

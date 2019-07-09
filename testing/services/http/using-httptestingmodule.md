---
description: For versions of Angular 5 and above.
---

# Using HttpTestingModule

Using the HttpClientTestingModule and HttpTestingController provided by Angular makes mocking out results and testing http requests simple by providing many useful methods for checking http requests and providing mock responses for each request.

### Breakdown of the Testing Strategy

For each test, we make a call to the service we would like to test. In the subscribe block we create an assertion using expect that will run when we receive a result.

```javascript
searchWikiService.search('Angular').subscribe(
        res => expect(res).toEqual(mockResponse, 'should return expected results'),
        fail
      );
```

 In this case, we  expect the response from the search method to be the mockResponse we will provide in the next steps.

#### Check Http Requests

Next, we can  check the details of the http request. In this case  we can check that a `'POST'`request to the url we expect was made, like so:

```javascript
const req = httpTestingController.expectOne(searchWikiService.searchUrl);
expect(req.request.method).toEqual('POST');
```

In this case,  the `expectOne`method of httpTestingController also checks that only one  request that uses POST and the url we expect was made when we call the `search` . There are other methods that httpTestingController provides such as `match` \(checks for any matching requests\) and `expectNone`\(checks that no matching requests are found\).

#### Using .flush\(\)

The request captured by the httpTestingController, `req`,  has a flush method on it which takes in whatever response you would like to provide for that request as an argument.

```javascript
req.flush(mockResponse);
```

#### Verify All Requests are Complete

Once all req have been provided a response using flush, we can verify that there are no more pending requests after the test.

```javascript
httpTestingController.verify();
```

### Complete Spec Example:

Below is a complete example showing a few different test cases for our search service that checks a few different mock responses we might expect to get: multiple results, no results and an error.

```javascript
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {SearchWikiService} from './wikisearch.service';

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
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        SearchWikiService
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    searchWikiService = TestBed.get(SearchWikiService);
  });
  
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should get search results', () => {

      searchWikiService.search('Angular').subscribe(
        res => expect(res).toEqual(mockResponse, 'should return expected results'),
        fail
      );

      // Check for correct requests: should have made one request to POST search from expected URL
      const req = httpTestingController.expectOne(searchWikiService.searchUrl);
      expect(req.request.method).toEqual('POST');

      // Provide each request with a mock response
      req.flush(mockResponse);
  ));
  
  it('should be OK returning no matching search results', () => {

    searchWikiService.search('Angular').subscribe(
      res => expect(res.length).toEqual(0, 'should have empty search array'),
      fail
    );

    const req = httpTestingController.expectOne(searchWikiService.searchUrl);
    req.flush([]); // Respond with empty search results
  });
  
  // TEST ERROR CASES BY MOCKING ERROR RESPONSE
  it('should turn 404 into an empty result', () => {

      searchWikiService.search('Angular').subscribe(
        res => expect(res.length).toEqual(0, 'should return empty results array'),
        fail
      );

      const req = httpTestingController.expectOne(searchWikiService.searchUrl);

      // respond with an error to test how its handled, in this case a 404
      const msg = 'nothing found';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

});
```




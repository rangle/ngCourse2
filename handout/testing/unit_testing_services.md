#Unit Testing Services
When testing services in Angular 2 we employ many of the same techniques and strategies used for testing components. Services, like components, are classes with methods and proprerties that we want to verify. Data is the main emphasis in testing services - are we getting, storing and propagating data correctly. 

##Testing Strategies for Services
When testing services that make HTTP calls we don't want to hit the server with real requests. This is because we want to isolate the testing of our service from any other outside points of failure. Our service may work, but if the API server is failing or giving values we aren't expecting then it may give the impression that our service is the one failing. Also, as a project grows and the number of unit tests increase, running through a large number of tests that make HTTP requests will take a long time and may put strain on the API server. Therefore, when testing services we'll be mocking out fake data with fake requests. 

##Injecting Dependencies
Like components, services often require dependencies that Angular injects through the constructor of the service's class. Since we are initializing these classes outside the bootstrapping process of Angular, we must explicitly inject these dependencies ourselves. This is accomplished by calling beforeEachProvider to feed in required dependencies like the HTTP module. 

###Mocking Dependencies

Since we want to isolate our service testing from outside network requests, we have to create mock requests where we can manually setup properties like expected responses, errors, headers, etc. Fortunately Angular 2 makes this an easy process by providing a way to make fake HTTP calls through the MockBackend class. This class can be injected wherever a service is expecting the HTTP module and used by the service as though it were the real HTTP module - except now the results/data setup by us, without any network request taking place. Lets take a look at some code:

*wikisearch.ts*
```typescript
    import {Http} from 'angular2/http';
    import {Injectable} from 'angular2/core';
    
    @Injectable()
    export class SearchWiki {
      constructor (private http: Http) {}
      
      search(term:string): Observable<any> {
        return this.http.get(
          'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + term
        ).map((response) => response.json);
      }
      
      searchXML(term:string): Observable<any> {
        return this.http.get(
          'https://en.wikipedia.org/w/api.php?action=query&list=search&format=xmlfm&srsearch=' + term
        );
      }
    }
```
Here is a basic service. It will query wikipedia with a search term and return an Observable with the results of the query. The search function will make a GET request with the supplied term, and the searchXML method will do the same thing, except request the response to be in XML instead of JSON. As you can see, it depends on the HTTP module to make a request to wikipedia.org. We want to use MockBackend to inject a mocked version of Http, so that any call to http.get will allow us to feed in whatever data we want - not the data from wikipedia.org. Lets take a look at our unit test:

*wikisearch.spec.ts*
```typescript
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
    import {SearchWiki} './wikisearch';
    
    describe("Testing the wikipedia search service", () => {
      beforeEachProviders(() => {
      	return [
      		MockBackend,
          	BaseRequestOptions,
          	SearchWiki,
          	provide(
              Http, {
                useFactory: (
                  mockbackend: ConnectionBackend, defaultOptions: BaseRequestOptions
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
As you can see, we have quite a few imports here to setup our mocked HTTP module. We use beforeEachProvider to include MockBackend to create our mocked HTTP module. In order to properly setup our mocked module we also include `BaseRequestOptions` and `ConnectionBackend`. We create an instance of `Http` that our service will get by using a factory. To create this instance the `Http` class take two parameters - the first is the backend to use (it has the type `ConnectionBackend`), and the second is the default options to use (of type `RequestOptions`). Since we are planning to use a mock backend, we feed in `MockBackend` to the first parameter. The second parameter, default options, doesn't have any bearing on the mocking aspects we plan on using, so we use `BaseRequestOptions`, which is the default implementation. 

Right now this test doesn't do anything aside from setting up a mockable HTTP module - lets take a look at some actual tests. 

##Testing HTTP Requests
Now that we have setup our service and created a mocked version of the HTTP module we are ready to start testing. The basic strategy for testing this service is to verify the contents of the request being made (correct URL) and ensuring that the data we mock into the service is returned correctly by the right method (calling search will return the data we expect it to). 

###Asynchronous Testing
Services, by their nature, perform asynchronous tasks. When we make an HTTP request we do so in an asynchronous manner so as not to block the rest of the application from carrying out its operations. We you recall, in a previous section we looked a bit at testing components asynchronously. Fortunately a lot of this knowledge carries over into testing services asynchronously. In the `angular2/testing module` there are a few functions that allow us to fake asynchronous behaviour. This is done by wrapping the entire test in a call to `fakeAsync`, and then using calls to `tick` to move the test along. FakeAsync essentially puts our test into a zone, and then listens for any asynchronous operations like setTimeouts, Promises, callbacks, etc. Those functions are not actually called asynchronously, instead Angular will rely on us calling tick, which will call those functions immediately, wait for their execution to finish, and then proceed, thus simulating time elapsing. 

Now that we have an idea of how to test our asynchronous services, lets take a look at a test to verify the search method of our WikiSearch service. 

*wikisearch.spec.ts*
```typescript
    describe("verify search", () => {
      it("searches for the correct term", 
      	inject([SearchWiki, MockBackend], fakeAsync((searchWiki, mockBackend) => {
      		mockBackend.connections.subscribe((conn:MockConnection) => {
      			expect(conn.request.url).toBe(
                  'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Angular'
                );
              	
               let response = new ResponseOptions(body: {
                  query: {
                    searchInfo: { totalhits: 1 }
    			  }, 
                  search: [
    			    {
                      ns: 0,
                      title: "Angular", 
                      size: 840,
                      wordcount: 115
    				}
    			  ]
    			});
              	conn.mockRespond(new Response(response));
    		});
      
      		var result;
      		searchWiki.search('Angular').subscribe((result) => {
      			result = result;
    		});
      
      		tick();
      		expect(result.query.searchInfo.totalhits).toBe(1)
    })))
    })
```
Our testing strategy is fairly straightforward - we check to see that our service has requested the right URL, and once we've responded with mock data we want to verify that our service returns that same data. 

We use `inject` to inject the `SearchWiki` service and the mock backend `MockBackend` into our test. We then wrap our entire test with a call to `fakeAsync`, which as you now know, will be used to control the asynchronous behaviour of the `SearchWiki` service for testing. 

Next, we make a call to `subscribe` to any incoming connections from our back end. This gives us access to an object `MockConnection`, which allows us to configure what response we want to send out from our back end, as well as test any incoming requests from the service we're testing. In our example, we want to verify that the `SearchWiki`'s search method makes a GET request to the correct URL. This is accomplished by looking at the request object we get when our `SearchWiki` service makes a connection to our mock backend. Analyzing the `request.url` property we can see if its value is what we expect it to be. Here we are only checking the URL, but in other scenarios we can see if certain headers have been set, or if certain POST data has been sent. 

Now, using the `MockConnection` object we mock in some arbitrary data. We create a new `ResponseOptions` object where we can configure the properties of our response. This follows the format of a regular [Angular 2 Response class](https://angular.io/docs/js/latest/api/http/Response-class.html). Here we have simply set the `body` property to that of a basic search result set you might see from Wikipedia. We could have also set things like cookies, HTTP headers, etc, and can even test how our service responds to errors by setting the `status` value to a non-200 state. Once we have our `ResponseOptions` configured we create a new instance of a `Respond` object and tell our backend to start using this as a response by calling `.mockRespond`. 

It is possible to use multiple responses - say your service had two possible GET requests, one for `/api/users`, and another `/api/users/1`. Each of these requests has a different corresponding set of mock data. When receiving a new connection through the `MockBackend` subscription, you can check to see what type of URL is being requested and respond with whatever set of mock data makes sense. 

Finally, we can test the `search` method of the `SearchWiki` service by calling it and subscribing to the result. Notice that we call `tick` before checking the contents of the search result. This is to ensure that all Observables, Promises, etc and any other asynchronous operations complete before proceeding. Once our search process has finished, we check the result object to see if it contains the same data that we mocked into our backend. If it is, then congratulations, your test has passed. 

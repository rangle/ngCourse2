# Asynchronous Testing

Services, by their nature, perform asynchronous tasks. When we make an HTTP request we do so in an asynchronous manner so as not to block the rest of the application from carrying out its operations. We you recall, in a previous section we looked a bit at testing components asynchronously. Fortunately a lot of this knowledge carries over into testing services asynchronously. In the `angular2/testing module` there are a few functions that allow us to fake asynchronous behaviour. This is done by wrapping the entire test in a call to `fakeAsync`, and then using calls to `tick` to move the test along. FakeAsync essentially puts our test into a zone, and then listens for any asynchronous operations like setTimeouts, Promises, callbacks, etc. Those functions are not actually called asynchronously, instead Angular will rely on us calling tick, which will call those functions immediately, wait for their execution to finish, and then proceed, thus simulating time elapsing.

Now that we have an idea of how to test our asynchronous services, lets take a look at a test to verify the search method of our WikiSearch service.

*wikisearch.spec.ts*

``` typescript
    describe("verify search", () => {
      it("searches for the correct term",
      	inject([SearchWiki, MockBackend], fakeAsync((searchWiki, mockBackend) => {
      		mockBackend.connections.subscribe((conn) => {
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

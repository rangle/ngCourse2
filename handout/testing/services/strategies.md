# Testing Strategies for Services

When testing services that make HTTP calls, we don't want to hit the server with real requests.
This is because we want to isolate the testing of our service from any other outside points of failure.
Our service may work, but if the API server is failing or giving values we aren't expecting,
it may give the impression that our service is the one failing.
Also, as a project grows and the number of unit tests increase,
running through a large number of tests that make HTTP requests will take a long time and may put strain on the API server.
Therefore, when testing services we'll be mocking out fake data with fake requests.


## Injecting Dependencies

Like components, services often require dependencies that Angular injects through the constructor of the service's class. Since we are initializing these classes outside the bootstrapping process of Angular, we must explicitly inject these dependencies ourselves. This is accomplished by using the `TestBed` to configure a testing module and feed in required dependencies like the HTTP module.

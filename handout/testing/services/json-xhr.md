# Testing JSONP and XHR Back-Ends

Some services take advantage of the JSONP or XHR module to fetch data instead of the traditional HTTP module. We use the same strategies for testing these services - create a mock back-end, initialize the service, and test to see if the request our service made is correct and if the data mocked through the back-end makes its way successfully to the service. Fortunately services that rely on the XHR module are tested *exactly* the same way as services that use the HTTP module. The only difference is in which class is used to mock the back-end. In services that use the HTTP module, the `MockBackend` class is used; in those that use XHR, the `XHRBackend` is used instead. Everything else remains the same.

Unfortunately services that use the JSONP module use a significantly different class for mocking the back-end. The class `MockBrowserJsonp` is used for this scenario.

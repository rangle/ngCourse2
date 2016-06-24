# Testing HTTP Requests

Now that we have set up our service and created a mocked version of the HTTP module, we are ready to start testing. The basic strategy for testing this service is to verify the contents of the request being made (correct URL) and ensure that the data we mock into the service is returned correctly by the right method (calling search will return the data we expect it to).

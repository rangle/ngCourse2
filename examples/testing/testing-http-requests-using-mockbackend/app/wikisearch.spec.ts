import {
  fakeAsync,
  inject,
  TestBed,
  tick
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
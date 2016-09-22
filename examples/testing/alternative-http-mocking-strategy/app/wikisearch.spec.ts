import {
  fakeAsync,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  Http,
  ResponseOptions,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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
  let mockHttp: Http;

  beforeEach(() => {
    mockHttp = { get: null } as Http;
    
    spyOn(mockHttp, 'get').and.returnValue(Observable.of({
      json: () => mockResponse
    }));
    
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http,
          useValue: mockHttp
        },
        SearchWiki
      ]
    });
  });
  
  it('should get search results', fakeAsync(
    inject([SearchWiki], searchWiki => {
      const expectedUrl = 'https://en.wikipedia.org/w/api.php?' +
        'action=query&list=search&srsearch=Angular';
      
      searchWiki.search('Angular')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
          expect(res).toEqual(mockResponse);
        });
    })
  ));
  
});
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchService {
  
  
  constructor(private http: Http) {}
  
  search(term: string) {
    let tryCount = 0;
    
    return this.http.get('https://api.spotify.com/v1/dsds?q=' + term + '&type=artist')
      .map((response) => response.json())
      .catch((e) => {
        const error = Observable.throw(
          new Error(`Failed after retrying ${tryCount} times`)
        );
        
        tryCount += 1;
        console.log(tryCount);
        
        return error;
      })
      .retry(3);
  }
}


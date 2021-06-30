# Retry

There are times when you might want to retry a failed request. For example, if the the user is offline you might want to retry a few times or indefinitely.

![Retry example from Slack](../../.gitbook/assets/slack-retry.jpg)

Use the RxJS `retry` operator. It accepts a `retryCount` argument. If not provided, it will retry the sequence indefinitely.

Note that the error callback is not invoked during the retry phase. If the request fails it will be retried and only after all the retry attempts fail the stream throws an error.

```typescript
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable()
export class SearchService {

  constructor(private http: Http) {}

  search(term: string) {
    let tryCount = 0;
    return this.http.get('https://api.spotify.com/v1/dsds?q=' + term + '&type=artist')
      .pipe(map(response => response.json()),
       retry(3));
    
  }
}
```

[View Example](http://plnkr.co/edit/zSAWwV?p=preview)


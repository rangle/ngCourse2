# Search with mergeMap


A case for MergeMap:

* [A simple observable stream](http://jsbin.com/nutegi/36/edit?js,console)
* [A stream of arrays](http://jsbin.com/lerake/3/edit?js,console)
* [Filter the items from each event](http://jsbin.com/widadiz/2/edit?js,console)
* [Stream of filtered items](http://jsbin.com/reyoja/2/edit?js,console)
* [Filter + map simplified with mergeMap](http://jsbin.com/sahiye/2/edit?js,console)

Let's say we wanted to implement an AJAX search feature in which every keypress in a text field will automatically perform a search and update the page with the results. How would this look? Well we would have an `Observable` subscribed to events coming from an input field, and on every change of input we want to perform some HTTP request, which is also an `Observable` we subscribe to. What we end up with is an `Observable` of an `Observable`.

By using `mergeMap` we can transform our event stream \(the keypress events on the text field\) into our response stream \(the search results from the HTTP request\).

_app/services/search.service.ts_

```javascript
import {HttpClient} from '@angular/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  search(term: string) {
    return this.http
      .get('https://api.spotify.com/v1/search?q=' + term + '&type=artist')
      .pipe(map((response) => response.json()))
            
  }
}
```

Here we have a basic service that will undergo a search query to Spotify by performing a get request with a supplied search term. This `search` function returns an `Observable` that has had some basic post-processing done \(turning the response into a JSON object\).

OK, let's take a look at the component that will be using this service.

_app/app.component.ts_

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from './services/search.service';
import { map } from 'rxjs/operators';
import { Artist } from './types/artist.type';

@Component({
    selector: 'app-root',
    template: `
        <form [formGroup]="coolForm"><input formControlName="search" placeholder="Search Spotify artist"></form>

        <div *ngFor="let artist of artists$ | async">
          {{artist.name}}
        </div>
    `
})

export class AppComponent {
    searchField: FormControl;
    coolForm: FormGroup;
    artists$: Observable<Artist[]>;

    constructor(private searchService:SearchService, private fb:FormBuilder) {
        this.searchField = new FormControl();
        this.coolForm = fb.group({search: this.searchField});

        this.artists$ = this.searchField.valueChanges.pipe(
          debounceTime(400),
          mergeMap(term => this.searchService.search(term)),
          map(result => result.artist.items)
         );
    }
}
```

Here we have set up a basic form with a single field, `search`, which we access through an observable. We've also set up a simple binding for any artists coming from the `SearchService`. The real magic here is `mergeMap` which allows us to flatten our two separate subscribed `Observables` into a single cohesive stream we can use to control events coming from user input and from server responses.

Note that mergeMap flattens a stream of `Observables` \(i.e `Observable` of `Observables`\) to a stream of emitted values \(a simple `Observable`\), by emitting on the "trunk" stream everything that will be emitted on "branch" streams.


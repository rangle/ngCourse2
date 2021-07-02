# Enhancing Search with switchMap

There is a problem with our previous implementation of incremental search.

What if the server, for some reason, takes a very long time to respond to a particular query? If we use `mergeMap`, we run the risk of getting results back from the server in the wrong order. Let's illustrate this with an example.

## A Quick Example

Consider a situation where we first type in the letters `ABC`, and suppose the string `ABC` is actually a special string where it will take the server a few extra seconds to reply.

Meanwhile, after we paused for a bit \(more than the debounce time\), we decide to type in another letter \(the letter X\) and our app sends a request to the server for the string `ABCX`. Since `ABCX` is not considered a special string, the server replies very quickly and our app sets the suggestions for `ABCX`.

A few seconds later, however, the server finally replies with the response for the `ABC` string, and our app receives that response and sets the search suggestions for `ABC`, overwriting the suggestions for the `ABCX` string, even though the request for that actually came afterwards.

Here is a simple diagram to illustrate the issue:

```text
// A1: Request for `ABC`
// A2: Response for `ABC`
// B1: Request for `ABCX`
// B2: Response for `ABCX`

--A1----------A2-->
------B1--B2------>
```

You can see that A2 arrives after B2 even though the A1 request began first. This will end up showing the wrong results to the user. "If the last input in the search was `ABCX` why am I seeing the results for `ABC`?" the user might think. To get around this problem we need to replace `mergeMap` with `switchMap`.

## What is `switchMap`?

`switchMap` is very similar to `mergeMap`, but with a very important distinction. Any events to be merged into the trunk stream are ignored if a new event comes in. Here is a marble diagram showing the behavior of `switchMap`:

![SwitchMap created by ReactiveX licensed under CC-3 \(http://reactivex.io/documentation/operators/mergeMap.html\)](../.gitbook/assets/switch-map.png)

In short, every time an event comes down the stream, `mergeMap` will subscribe to \(and invoke\) a new observable without unsubscribing from any other observable created by a previous event. `switchMap` on the other hand will automatically unsubscribe from any previous observable when a new event comes down the stream.

In the diagram above, the round "marbles" represent events in the originating stream. In the resulting stream, "diamonds" mark the creation \(and subscription\) of an inner observable \(that is eventually merged onto the trunk stream\) and "squares" represent values emitted from that same inner observable.

Just like `mergeMap`, the red marble gets replaced with a red diamond and a subsequent red square. The interaction between the green and blue marble events are more interesting. Note that the green marble gets mapped to a green diamond immediately. And if enough time had passed, a green square would be pushed into the trunk stream but we do not see that here.

Before the green square event is able to happen, a blue marble comes through and gets mapped to a blue diamond. What happened is that the green square is now ignored and do not get merged back into the trunk stream. The behavior of `switchMap` can be likened to a `mergeMap` that "switches" to the more immediate incoming event and ignores all previously created event streams.

In our case, because the blue marble event happened very quickly after the green marble, we "switched" over to focus on dealing with the blue marble instead. This behavior is what will prevent the problem we described above.

If we apply `switchMap` to the above example, the response for `ABC` would be ignored and the suggestions for `ABCX` would remain.

## Enhanced Search with `switchMap`

Here is the revised component using `switchMap` instead of `mergeMap`.

_app/app.component.ts_

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from './services/search.service';
import { debounceTime, switchMap } from 'rxjs/operators';
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

        this.searchField.valueChanges.pipe(
          debounceTime(400),
          switchMap(term => this.searchService.search(term))
          );
    }
}
```

This implementation of incremental search with `switchMap` is more robust than the one we saw on the previous page with `mergeMap`. The suggestions that the user sees will always eventually reflect the last thing the user typed. Thanks to this, we can guarantee a great user experience regardless of how the server responds.

## Further Resources

* [SwitchMap Examples](https://www.learnrxjs.io/operators/transformation/switchmap.html)
* [Egghead Video Tutorial on SwitchMap](https://egghead.io/lessons/rxjs-starting-a-stream-with-switchmap?course=step-by-step-async-javascript-with-rxjs)
* [RxJS Documentation for SwitchMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap)


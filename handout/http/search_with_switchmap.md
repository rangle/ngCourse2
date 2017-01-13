# Enhancing Search with `switchMap`

There is a problem with our previous implementation of incremental search.

What if the server, for some reason, takes a very long time to respond to a particular query? If we use `flatMap`, we run the risk of getting results back from the server in the wrong order. Let's illustrate this with an example.

## A Quick Example

Consider a situation where we first type in the letters `ABC`, and suppose the string `ABC` is actually a special string where it will take the server a few extra seconds to reply.

Meanwhile, after we paused for a bit (more than the debounce time), we decide to type in another letter (the letter X) and our app sends a request to the server for the string `ABCX`. Since `ABCX` is not considered a special string, the server replies very quickly and our app sets the suggestions for `ABCX`.

A few seconds later, however, the server finally replies with the response for the `ABC` string, and our app receives that response and sets the search suggestions for `ABC`, overwriting the suggestions for the `ABCX` string, even though the request for that actually came afterwards.

Here is a simple diagram to illustrate the issue:

```
// A1: Request for `ABC`
// A2: Response for `ABC`
// B1: Request for `ABCX`
// B2: Response for `ABCX`

--A1----------A2-->
------B1--B2------>
```

You can see that A2 arrives after B2 even though the A1 request began first. So how do we get around this problem? We can use `switchMap`.

## What is `switchMap`?

SwitchMap is very similar to `flatMap`, but with a very important distinction. Any events to be merged into the trunk stream are cancelled or ignored if a new event comes in. Here is a marble diagram showing the behavior of `switchMap`:

![SwitchMap created by ReactiveX licensed under CC-3 (http://reactivex.io/documentation/operators/flatmap.html)](../images/switch-map.png)

Just like `flatMap`, the red marble gets replaced with a red diamond and a subsequent red square. The interaction between the green and blue marble events are more interesting. Note that the green marble gets mapped to a green diamond immediately. And if enough time had passed, a green square would be pushed into the trunk stream but we do not see that here.

Before the green square event is able to happen, a blue marble comes through and gets mapped to a blue diamond. What happened is that the green square is now ignored and do not get merged back into the trunk stream. The behavior of `switchMap` can be likened to a `flatMap` that "switches" to the more immediate incoming event and ignores all previously created event streams.

In our case, because the blue marble event happened very quickly after the green marble, we "switched" over to focus on dealing with the blue marble instead. This behavior is what will prevent the problem we described above.

If we apply `switchMap` to the above example, the response for `ABC` would be ignored and the suggestions for `ABCX` would remain.

## Enhanced Search with `switchMap`

Here is the revised component using `switchMap` instead of `flatMap`.

_*app/app.component.ts*_

```js
import { Component } from '@angular/core';
import { FormControl,
	FormGroup,
	FormBuilder } from '@angular/forms';
import { SearchService } from './services/search.service';
import 'rxjs/Rx';

@Component({
	selector: 'app-root',
	template: `
		<form [formGroup]="coolForm"><input formControlName="search" placeholder="Search Spotify artist"></form>

		<div *ngFor="let artist of result">
		  {{artist.name}}
		</div>
	`
})

export class AppComponent {
	searchField: FormControl;
	coolForm: FormGroup;

	constructor(private searchService:SearchService, private fb:FormBuilder) {
		this.searchField = new FormControl();
		this.coolForm = fb.group({search: this.searchField});

		this.searchField.valueChanges
		  .debounceTime(400)
			.switchMap(term => this.searchService.search(term))
			.subscribe((result) => {
				this.result = result.artists.items
			});
	}
}
```
[View Example](http://plnkr.co/edit/FYLTcx?p=preview)

## Further Resources

https://www.learnrxjs.io/operators/transformation/switchmap.html
https://egghead.io/lessons/rxjs-starting-a-stream-with-switchmap?course=step-by-step-async-javascript-with-rxjs
http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap

## Cancel a Request

Cancelling an HTTP request is a common requirement. For example, you could have a queue of requests where a new request supersedes a pending request and that pending request needs to be cancelled.

To cancel a request we call the `unsubscribe` function of its subscription.

```ts
@Component({ /* ... */ })
export class AppComponent {
  /* ... */

  search() {
    const request = this.searchService.search(this.searchField.value)
      .subscribe(
        result => { this.result = result.artists.items; },
        err => { this.errorMessage = err.message; },
        () => { console.log('Completed'); }
      );

    request.unsubscribe();
  }
}
```

[View Example](http://plnkr.co/edit/XQL8v9?p=preview)

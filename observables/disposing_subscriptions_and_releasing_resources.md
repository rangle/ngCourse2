# The risks with Observable Subscriptions
One of the things you often hear about observables in Angular is that you should remember to unsubscribe, but you don't always know why this is important. It's important to remember that often when we manage our state, our observables - while referenced in our components - actually exist *outside* of them. 

This is important to remember because we often intuitively (if incorrectly) assume that when our components 'go away' - all associated data, and memory consumption goes with them, freeing up resources. This is mostly true, but let's imagine a situation where we get a slice of state from NgRx, and subscribe to it in our Observable.

Let's say we have a list of Products we are showing, using an ngFor, iterating over an array of productIds.

```html
<my-product *ngFor="let productId in productIdList" [productId]="productId"></my-product>
```

Inside of `my-product`'s ngOnInit:

```typescript
ngOnInit() {
  this.store.select(getProductById, this.productId) // for more about selectors with props: https://ngrx.io/guide/store/selectors#using-selectors-with-props
    .subscribe(product => this.fullProduct = product);
}
```

In this pattern, for each `productId in productIdList` - we are firing this ngOnInit inside our `my-product` component. If there are 10 items in this list, we fire this 10 times, and make _10 subscriptions_. 
Those subscriptions are attached to our source Observable, in this case, our singleton NgRx store (meaning there is one instance shared in our application). If for some reason, those 10 items in `productIdList` change to a brand new 10 items, _10 new subscriptions are added to that store's observable_.
You can imagine in a situation where we have a very active `productIdList` - lets imagine it is attached to a users filtering through a search field - that this could quickly balloon up into large numbers. Our source Observable will believe that it has hundreds or thousands of subscriptions still remaining, because it doesn't know that the component that originally requested it, has disappeared.

This is one of the primary ways to have memory leaks in Angular, and something that needs to be considered carefully whenever you work on a project, especially during the peer review process. We need to ensure we appropriately unsubscribe from observables in situations like the one above, but there are a few different ways to tackle this problem.

# Disposing Subscriptions and Releasing Resources

In some scenarios we may want to unsubscribe from an `Observable` stream. Doing this is pretty straightforward as the `.subscribe()` call returns a data type that we can call `.unsubscribe()` on.

```javascript
export class MyApp {

  private data: Observable<Array<string>>;
  private value: string;
  private subscribed: boolean;
  private status: string;

    init() {

        this.data = new Observable(observer => {
            let timeoutId = setTimeout(() => {
                observer.next('You will never see this message');
            }, 2000);

            this.status = 'Started';

            return onUnsubscribe = () => {
                this.subscribed = false;
                this.status = 'Finished';
                clearTimeout(timeoutId);
            }
        });

        let subscription = this.data.subscribe(
            value => this.value = value,
            error => console.log(error),
            () => this.status = 'Finished';
        );
        this.subscribed = true;

        setTimeout(() => {
          subscription.unsubscribe();
        }, 1000);
    }

}
```

[View Example](http://plnkr.co/edit/0MfW5d?p=preview)

Calling `.unsubscribe()` will unhook a member's callbacks listening in on the `Observable` stream. When creating an `Observable` you can also return a custom callback, `onUnsubscribe`, that will be invoked when a member listening to the stream has unsubscribed. This is useful for any kind of cleanup that must be implemented. If we did not clear the setTimeout then values would still be emitting, but there would be no one listening. To save resources we should stop values from being emitted. An important thing to note is that when you call `.unsubscribe()` you are destroying the subscription object that is listening, therefore the on-complete event attached to that subscription object will not get called.

In most cases we will not need to explicitly call the `unsubscribe` method unless we want to cancel early or our `Observable` has a longer lifespan than our subscription. The default behavior of `Observable` operators is to dispose of the subscription as soon as `.complete()` or `.error()` messages are published. Keep in mind that RxJS was designed to be used in a "fire and forget" fashion most of the time.


# Best Practice: Async Pipe

While the above understanding of how to handle subscriptions works, it may not always be the best practice. Having to manually handle the subscriptions of our Observables can feel cumbersome, and we can sometimes have undesirable patterns come out of having many `.subscribe()` methods in our component code.

However, there is an elegant solution built right into Angular that works for almost every observable requirement - the Async pipe, available in Angular's `CommonModule`.

Let's look at this example again:

```typescript
ngOnInit() {
  this.store.select(getProductById, this.productId)
    .subscribe(product => this.fullProduct = product);
}
```
If we went further, we would see that we have something like this in our template code:

```html
<my-product-card [productData]="fullProduct" ></my-product-card>
```

where `fullProduct` is updated in the subscription of out select method. If we wanted to unsubscribe using the above mentioned method, we would have this:

```typescript

subscription;

ngOnInit() {
  this.subscription = this.store.select(getProductById, this.productId)
    .subscribe(product => this.fullProduct = product);
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

Not too cumbersome, but the more subscriptions you have, the more overhead it is in your component code. However, with Angular's async pipe, you don't need any of that, instead, lets simplify the component's typescript.

```typescript
ngOnInit() {
  // it's good practice to denote that you are working with an observable by appending a $ at the end of the variable name
  this.fullProduct$ = this.store.select(getProductById, this.productId);
}
```

Now we remove any reference to subscribe inside the component, and instead are working with the selectors returned value, which remains an observable. In our template:

```html
<my-product-card [productData]="fullProduct$ | async"></my-product-card>
```

Our async pipe that we attach actually 'unwraps' our Observable, providing the relevant data to our `[productData]` input, and it will update appropriately, whenever the value of our selector changes, keeping the magic of observables intact.

But what about memory leaks? What about our Subscription? Luckily, the async pipe handles that for us - when our template is removed from the dom, the async pipe fires unsubscribe on it's associated Observable, handling the process of freeing up resources for you!

We would recommend that in almost every situation, writing your observables in this way will be the most ideal way to protect your code from memory leaks, and give you an ideal pattern to work with when it comes to Observables in your components.

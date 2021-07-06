# Cold vs Hot Observables

`Observables` can be classified into two main groups: hot and cold `Observables`. Let's start with a cold `Observable`.

```javascript
const obsv = new Observable(observer => {

  setTimeout(() => {
    observer.next(1);
  }, 1000);

  setTimeout(() => {
    observer.next(2);
  }, 2000);

  setTimeout(() => {
    observer.next(3);
  }, 3000);

  setTimeout(() => {
    observer.next(4);
  }, 4000);

});

// Subscription A
setTimeout(() => {
  obsv.subscribe(value => console.log(value));
}, 0);

// Subscription B
setTimeout(() => {
  obsv.subscribe(value => console.log(`>>>> ${value}`));
}, 2500);
```

[View Example](http://jsbin.com/felanu/46/edit?js,console)

In the above case subscriber B subscribes 2000ms after subscriber A. Yet subscriber B is starting to get values like subscriber A only time shifted. This behavior is referred to as a _cold_ `Observable`. A useful analogy is watching a pre-recorded video, such as on Netflix. You press Play and the movie starts playing from the beginning. Someone else can start playing the same movie in their own home 25 minutes later.

On the other hand there is also a _hot_ `Observable`, which is more like a live performance. You attend a live band performance from the beginning, but someone else might be 25 minutes late to the show. The band will not start playing from the beginning and the latecomer must start watching the performance from where it is.

We have already encountered both kind of `Observables`. The example above is a cold `Observable`, while the example that uses `valueChanges` on our text field input is a hot `Observable`.

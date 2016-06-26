# Cold vs Hot Observables
`Observables` can be classified into two main groups: hot and cold `Observables`. Let's start with a cold `Observable`. 

```js
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

In the above case subscriber B subscribes 2000ms after subscriber A. Yet subscriber B is starting to get values like subscriber A only time shifted. This behavior is referred to as a _cold `Observable`_. A useful analogy is watching a pre-recorded video, such as on Netflix. You press Play and the movie starts playing from the beginning. Someone else can start playing the same movie in their own home 25 minutes later.

On the other hand there is also a _hot `Observable`_, which is more like a live performance. You attend a live band performance from the beginning, but someone else might be 25 minutes late to the show. The band will not start playing from the beginning and the latecomer must start watching the performance from where it is.

We have already encountered both kind of `Observables`. The example above is a cold `Observable`, while an example that uses `valueChanges` on our text field input is a hot `Observable`.

### Converting from Cold Observables to Hot Observables
A useful method within RxJS API is the `publish` method. This method takes in a cold `Observable` as its source and returns an instance of a `ConnectableObservable`. In this case we will have to explicitly call `connect` on our hot `Observable` to start broadcasting values to its subscribers.

```js
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

}).publish();

obsv.connect();

// Subscription A
setTimeout(() => {
  obsv.subscribe(value => console.log(value));
}, 0);

// Subscription B
setTimeout(() => {
  obsv.subscribe(value => console.log(`      ${value}`));
}, 2500);
```
[View Example](http://jsbin.com/fewotud/3/edit?js,console)

In the case above, the live performance starts at `1000ms`, subscriber A arrived to the concert hall at `0s` to get a good seat, and our subscriber B arrived at the performance at `2500ms` and missed a bunch of songs.

Another useful method to work with hot `Observables` instead of `connect` is `refCount`. This is auto connect method, that will start broadcasting as soon as there is more than one subscriber. Analogously, it will stop if the number of subscribers goes to 0; in other words, if everyone in the audience walks out, the performance will stop.



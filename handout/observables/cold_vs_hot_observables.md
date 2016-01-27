# Cold vs. Hot Observables
Observables can be classified into 2 main groups, Hot and Cold Observables. Let's start with a cold Observable. 

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
[View Example](http://jsbin.com/felanu/40/edit?js,console)

In the above case subscriber B subscribes 2000ms after subscriber A. Yet subscriber B is starting to get values like subscriber A only time shifted. This behaviour is referred to as a Cold Observable. A useful analogy is watching a pre-recorded video, let's say on Netflix. You press play and the movie starts playing from the beginning. Someone else, can start playing the same movie in their own home 25 minutes later.

On the other hand there is also a Hot Observable, which is more like a live performance. You attend a live band performance from the beginning, but someone else might be 25 minutes late to the show. The band will not start playing from the beginning and you have to start watching the performance from where it is.

We have already encountered both kind of observables, the example above is a cold observable, while an example that uses `valueChanges` on our text field input is a hot observable.

### Converting from Cold Observables to Hot Observables
A useful method within RxJS API, is the `publish` method. This method takes in a cold observable as it's source and returns an instance of a `ConnectableObservable`. In this case we will have to explicitly call `connect` on our hot observable to start broadcasting values to its subscribers.

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
  obsv.subscribe(value => console.log(`      ${value}`));
}, 2500);
```
[View Example](http://jsbin.com/fewotud/3/edit?js,console)

In the case above, the live performance starts at 1500ms, subscriber A arrived to the concert hall 1500ms early to get a good seat, and our subscriber B arrived to the performance 500ms late and missed a bunch of songs.

Another useful method to work with hot observables instead of `connect` is `refCount`. This is auto connect method, that will start broadcasting as soon as there are more than one subscriber. Analogously, it will stop if the number of subscribers goes to 0, in other words no performance will happen if there is no one in the audience.



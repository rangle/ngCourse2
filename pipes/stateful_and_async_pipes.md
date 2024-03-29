# Stateful Pipes

There are two categories of pipes:

* _Stateless_ pipes are pure functions that flow input data through without remembering anything or causing detectable side-effects. Most pipes are stateless. The `CurrencyPipe` we used and the length pipe we created are examples of a stateless pipe.
* _Stateful_ pipes are those which can manage the state of the data they transform. A pipe that creates an HTTP request, stores the response and displays the output, is a stateful pipe. Stateful Pipes should be used cautiously.

Angular provides `AsyncPipe`, which is stateful.

## AsyncPipe

AsyncPipe can receive a `Promise` or `Observable` as input and subscribe to the input automatically, eventually returning the emitted value\(s\). It is stateful because the pipe maintains a subscription to the input and its returned values depend on that subscription.

[View Example](https://stackblitz.com/github/rangle/angular-book-examples/tree/feat-pure-impure-pipes)

## Implementing Stateful Pipes

Pipes are stateless by default. We must declare a pipe to be stateful by setting the pure property of the `@Pipe` decorator to false. This setting tells Angular’s change detection system to check the output of this pipe each cycle, whether its input has changed or not.

```typescript
// naive implementation assumes small number increments
@Pipe({
  name: 'animateNumber',
  pure: false
})
export class AnimateNumberPipe implements PipeTransform {
  private currentNumber: number = null; // intermediary number
  private targetNumber: number = null;

  transform(targetNumber: number): string {
    if (targetNumber !== this.targetNumber) {
      this.currentNumber = this.targetNumber || targetNumber;
      this.targetNumber = targetNumber;

      const difference = this.targetNumber - this.currentNumber

      Observable.interval(100)
        .pipe(take(difference))
        .subscribe(() => {
          this.currentNumber++;
        })
    }

    return this.currentNumber;
  }
}
```

[View Example](https://stackblitz.com/github/rangle/angular-book-examples/tree/feat-pure-impure-pipes)


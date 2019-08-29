# Pure / Impure Pipes

There are two categories of pipes:

* _Pure_ pipes are pure functions that flow input data through without remembering anything or causing detectable side-effects. Most pipes are pure. The `CurrencyPipe` we used and the length pipe we created are examples of a pure pipe. They all have pure flag set to true by default. Pure pipes changes primitive input values or object references for nested values. It ignores the nested object values. 
* _Impure_ pipes are those which can manage the state of the data they transform. A pipe that creates an HTTP request, stores the response and displays the output, is a impure pipe. Impure pipes should be used cautiously. They are executed on every change detection cycle. Set pure flag to false when creating impure pipes.

Angular provides `AsyncPipe`, which is stateful.

## AsyncPipe

AsyncPipe can receive a `Promise` or `Observable` as input and subscribe to the input automatically, eventually returning the emitted value\(s\). It is stateful because the pipe maintains a subscription to the input and its returned values depend on that subscription.

[View Example](https://stackblitz.com/github/rangle/angular-book-examples/tree/feat-pure-impure-pipes?file=src%2Fapp%2Fapp.component.ts)

## Implementing Impure Pipes

Pipes are pure by default. We must declare a pipe to be impure by setting the pure property of the `@Pipe` decorator to false. This setting tells Angular’s change detection system to check the output of this pipe each cycle, whether its input has changed or not.

```typescript
// naive implementation assumes small number increments
@Pipe({
  name: 'animateNumber',
  pure: false,
})
export class AnimateNumberPipe implements PipeTransform {
  private currentNumber: number = null;
  private targetNumber: number = null;

  transform(targetNumber: number): number {
    if (targetNumber !== this.targetNumber) {
      this.currentNumber = this.targetNumber || targetNumber;
      this.targetNumber = targetNumber;

      const difference = this.targetNumber - this.currentNumber;

      interval(100)
        .pipe(take(difference))
        .subscribe(() => {
          this.currentNumber++;
        });
    }
    return this.currentNumber;
  }
}
```

[View Example](https://stackblitz.com/github/rangle/angular-book-examples/tree/feat-pure-impure-pipes?file=src%2Fapp%2Fanimate-number.pipe.ts)


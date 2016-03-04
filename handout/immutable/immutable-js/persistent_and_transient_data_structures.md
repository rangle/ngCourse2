# Persistent and transient data structures

Immutable data structures are also sometimes referred to as **persistent data structures**, since its values persist for its lifetime. Immutable.js provides the option for **transient data structures**, which is a mutable version of a persistent data structure during a transformation stage and returning a new immutable version upon completion. This is one approach to solving the performance issues we encountered earlier. Let's revisit the immutable case outlined in the performance example, but using a transient data structure this time:

```typescript
import * as Immutable from 'immutable';

let list = Immutable.List();

list = list.withMutations(mutableList => {
  let val = "";

  return Immutable.Range(0, 1000000)
    .forEach(() => {
      val += "concatenation";
      mutableList.push(val);
  });
});

console.log(list.size); // writes 1000000
list.push('');
console.log(list.size); // writes 1000000
```

As we can see in [this performance test](http://jsperf.com/immutable-js-data-structure-perf2/2), the transient list builder was still a lot slower than the fully mutable version, but much faster than the fully immutable version. Also, if you pass the mutable array to `Immutable.List` or `Immutable.fromJS`, you'll find the transient version closes the performance gap. The test also shows how slow `Object.freeze` can be compared to the other 3.

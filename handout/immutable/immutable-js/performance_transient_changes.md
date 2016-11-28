# Performance and Transient Changes

## Performance

Immutable data structures often have a performance penalty due to the costs of allocation new memory and copying data. Consider these two examples, one which uses a mutable array and one which uses an Immutable.js collection.

**Mutable**
```typescript
const list = [];
let val = "";

Immutable.Range(0, 1000000)
  .forEach(function() {
    val += "concatenation";
    list.push(val);
  });
```

**Immutable**
```typescript
const init = {
  list: Immutable.List(),
  val: ""
};

const list = Immutable.Range(0, 1000000)
  .reduce(function(reduced) {
    var next = reduced.val + "concatenation";

    return {
      list: reduced.list.push(next),
      val: next
    };
  }, init).list
```

Here the fully immutable code runs around 90% slower than the mutable code! While immutable data can make code much easier to reason about, there is definitely a cost associated with that decision. As we can see here for iterative concat, this can have a major impact on usability. Fortunately, Immutable.js provides some features where the performance costs can be mitigated.

## Persistent Data Structures and Transient Changes

Immutable data structures are also sometimes referred to as _persistent data structures_, since their values persist for their lifetime. Immutable.js provides the option for _transient changes_: operations during which an immutable data structure can perform mutable changes locally while returning an immutable result. This is one approach to solving the performance issues we encountered earlier. Let's revisit the immutable case outlined in the performance example, but using a transient data structure this time:

```typescript
import * as Immutable from 'immutable';

let list = list.withMutations(mutableList => {
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

This transient list builder is still much slower than our fully mutable implementation but much faster than our fully immutable version.

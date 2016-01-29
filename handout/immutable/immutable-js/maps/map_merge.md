# Map.merge

Sometimes we want to update multiple properties. We can do this using the `merge` method.

```typescript
let baseButton = Immutable.Map<string, any>({
  text: 'Click me!',
  state: 'inactive',
  width: 200,
  height: 30
});

let submitButton = baseButton.merge({
  text: 'Submit',
  state: 'active'
});

console.log(submitButton);
// writes { text: 'Submit', state: 'active', width: 200, height: 30 }
```


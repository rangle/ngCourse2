# Actions

To tell Redux to modify your application state, we use a concept call Actions. 
Redux actions are simple JSON objects that implement the `Action` interface 
provided by ngrx:

```typescript
export interface Action {
  type: string;
  payload?: any;
}
```

The `type` property is an uppercase name used to uniquely identify your action
to your application. 

The `payload` property provides a way to pass additional data to Redux, and it
is optional.

> Plain objects are used so that the actions are serializable and can be 
replayable into the application state. Even if your actions involve asynchronous 
logic, the final dispatched action will remain a plain JSON object.
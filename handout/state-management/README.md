# State Management

For larger Angular applications with a lot of asynchronous activity and where
there's a lot of state that is being shared and manipulated across multiple 
components and modules, managing state can be quite challenging. In a typical 
application, we're managing things like:
 
* Data that comes from the server and whether it's pending or resulted in an 
  error
* UI state like toggles, alerts and errors messages
* User input, such as form submissions, filters and search queries
* Custom themes, credentials and localization
* Many other types of state
 
As the application grows, how do we know that a state change in one module will 
consistently and accurately reflected in other modules? And what if these 
modifications result in even more state changes? Eventually, it becomes 
extremely difficult to reason about what's actually happening in your 
application, and be a large source of bugs.

In Angular, there are 3 main ways to solve this problem.

1. [Redux using @ngrx](ngrx/README.md);
2. Redux using ng2-redux; and
3. Angular Services and RxJS.
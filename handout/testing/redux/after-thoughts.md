# Afterthoughts

The examples outlined above are just one approach to unit testing in Redux. During actual development it might prove to be too costly to maintain tests for every action and reducer, and in some cases even trivial (i.e. should I be paranoid about this JSON object with one property being returned?).

Another approach we've tried is to treat the overall state change in the store triggered by an action (or by a series of actions) as a single unit - in the Redux world reducers don't function without actions and vice versa, so why separate them? This leaves more flexibility when making changes to actions and reducers without losing scope of what Redux is doing for our app.  

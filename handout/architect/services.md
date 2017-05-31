# Services

The best way to to understand the value of services
is to look at the problem they are meant to solve.
We'll start with some code that might feel familiar:
a component that shows the blog posts a user is allowed to see.
The first pass might look like this:

```typescript
@Component({ /* ... */})
class BlogPage implements OnInit {
  private blogs;

  constructor (private http: Http) {}

  ngOnInit () {
    this.http
      .get(`/api/blogs/`)
      .map(response => response.json())
      .subscribe(data => {
        this.blogs = data.blogs;
        this.http
          .get(`/api/users/me/`)
          .map(response => response.json())
          .subscribe(user => {
            if (this.blogs == null) return;
            this.filterBlogsByAccess(user);
            this.sortBlogsByDate("desc");
          });
      });
  }

  private filterBlogsByAccess (user) {
    let filteredBlogs = [];
    for (let blog of this.blogs) { /* ... */ }
    this.blogs = filteredBlogs;
  }

  private sortBlogsByDate (direction) {
    this.blogs.sort(/* ... */);
  }
}
```

This block of code will certainly get us over the finish line,
but that HTML component is doing too much,
and knows too much about the overall system.
What happens in a couple of months when it needs to be fixed?
What about extensions?
Reuse?
How do you test it?
How many places in the app will URLs need to be modified when the API changes?
And what about the date extraction?

In his book *[Refactoring](https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672/)*,
Martin Fowler described a technique called "Extract Method".
It is based on the idea that
moving chunks of code to their own descriptively-named methods
helps make the class easier to read and work with.
Let's apply that to our code:

```typescript
@Component({ /* ... */ })
class BlogPage implements OnInit {
  private user;
  private blogs;

  constructor (private http: Http) {}

  ngOnInit () {
    this.loadPage();
  }

  private loadPage () {
    this.getBlogs().subscribe(() => {
      if (this.blogs == null) { return; }
      this.getUser().subscribe(() => {
        this.filterBlogsByAccess(this.user);
        this.sortBlogsByDate('desc');
      });
    });
  }

  private getBlogs () {
    return this.http.get('/api/blogs/')
      .map(response => response.json())
      .do(data => this.blogs = data.blogs);
  }

  private getUser () {
    return this.http.get('/api/users/me/')
      .map(response => response.json())
      .do(user => this.user = user);
  }

  private filterBlogsByAccess (user) {
    /* this.blogs = ... */
  }

  private sortBlogsByDate (direction) {
    /* this.blogs =  ... */
  }
}
```

This is a little easier to follow,
and we'd like to imagine that Fowler would agree.
The `loadPage` method is responsible for loading and filtering data,
and lets the other sections of the class worry about
the details of who's allowed to see what and the order in which items should be displayed,
so that `loadClass` can focus on the concepts.
With some of the noise cleared out of the way,
it becomes easier to see that we can optimize away the second call for data
if `this.blogs` is null.

There are still problems with this code,
though,
and while most of them have gotten better,
some have actually gotten worse.
The most important is the security concern.
All of the code thus far has been mutating `this.blogs` in place,
and waiting for the `user` to be retrieved
so that the list of blogs could be filtered.
Given that we keep referring to `this.blogs` as the place to store view-friendly data,
though,
this means that the unfiltered list of blogs is likely being shown while we're waiting.
This problem is even harder to spot in the second version of the code than the first.
More generally,
the second version of the code is both easier and harder to maintain
for exactly that reason.

Even without that security problem,
the second version has other problems that should concern us.
You may already be shaking your head at the violations of the **Single Responsibility Principle**.
This holds that a component should have exactly one reason to change,
or equivalently,
that only the head of one department should be bugging you
for any particular piece of code to be fixed or modified.
Angular Components exist for the sole purpose of showing the data on the screen
and reacting to users interacting with that view.
Anything beyond that one purpose is almost always
beyond what the class should be responsible for.

This code is still not easy to test, either.
All of the methods are private
in order to protect the data being changed by outside parties.
That also means that they cannot be used for testing by outside libraries.
As a result,
the only way to test this class is
to instantiate it with a real or fake HTTP service,
insert it onto the page,
and test that it produces the expected view.
Whenever there are this many intermediate steps that should be separately testable,
it is another sign that we are probably breaking the Single Responsibility Principle.

Let's try one more refactoring.
This time, we'll apply "Extract Method" to single functions
instead of entire methods:

```typescript
// Get data from server.
const fetchJSON = (http, url) =>
  http.get(url).map(response => response.json());

// Return a new array filled with old values.
const filterByUserAccess = user => blogs =>
  blogs.filter(/* ... */);

// Return new array filled with old values.
const sortBlogsByDate = direction => blogs =>
  blogs.slice().sort(/* ... */);

// Load user first to prevent data leakage.
const fetchFilteredBlogs = http => {
  const userStream = fetchJSON(http, `/api/users/me/`);
  const blogStream = fetchJSON(http, `/api/blogs/`)
    .map(({blogs}) => blogs);
  const filterStream = userStream.mergeMap(user =>
    blogStream.filter(filterByUserAccess(user)));
  return filterStream;
};

@Component({ /* ... */ })
class BlogPage implements OnInit {
  private blogs = [];

  constructor (private http: Http) {}

  ngOnInit () { this.loadPage(this.http); }

  private loadPage (http) {
    fetchFilteredBlogs(http)
      .map(sortBlogsByDate(`desc`))
      .subscribe(blogs => this.blogs = blogs);
  }
}
```

This time the component is almost tiny:
it knows nothing about users, or user access, or URLs.
The function that is responsible for building the filtered stream of blogs
knows nothing about views,
so there is never any danger of showing unauthorized blogs on the page
while waiting for data to load.
In fact,
most of the stream building can be flattened now that we aren't mixing view code with data code,
and we can see that it's barely possible for us to have the same error we previously did.

The functions we have created are all safe to be exported and tested:
they aren't tied to the function of any one class or class instance,
so having access to them shouldn't corrupt the behavior of any running class instance.
What's more important is that these are _pure_ functions,
i.e.,
they don't mutate their input or otherwise change the outside world.
With our code refactored in this way,
we can see that these functions work at different conceptual levels.
Some of them are very low-level, accessing and parsing JSON data,
while others work at a business level with data that is important to the product,
and others still exist to help the view do its job.

But there are still a couple of problems we should address.
The first is that if these functions really are safe for re-use,
we don't want to write them afresh for each page.
The second is that once we do that,
we don't want to pass a lot of data back and forth manually
between all of the little functions we are composing to make our system.
Instead,
we want a system that takes care of those details---something
that is easier than passing `http` all the way through.

Both of these problems can be solved via **Services**.
Here's an example:

```typescript
import {Injectable} from '@angular/core';
import User from './entities/user';

@Injectable()
export class UserService {

  constructor (private http: Http) {}

  getUser () {
    return this.http.get('/api/users/me/')
      .map(response => response.json())
      .map(data => User.fromServer(data));
  }
}
```

The `@Injectable` decorator tells Angular that we are making a service of our own.
This particular service is intentionally minuscule,
because it is clearly doing just one thing:
converting user data from the server into some formally-typed data
that the client is going to use.

Let's create another:

```typescript
export const filterByUserAccess = user => blogs =>
  blogs.filter(/* ... */);


@Injectable()
export class AuthorizedBlogService {

  constructor (
    private blogService: BlogService,
    private userService: UserService,
  ) {}

  getBlogs () {
    const userStream = userService.getUser();
    const blogStream = blogService.getBlogs();

    return userStream.mergeMap(user =>
      blogStream.filter(filterByUserAccess(user)));
  }
}
```

This new `AuthorizedBlogService` can import lower level services,
like the services that load blogs and users.
Instead of worrying about low-level concerns like HTTP,
it can then focus on business-level concerns
like who is allowed to see which content.

It should be clear to even a casual reader what each of these services is doing.
Moreover,
if the lower-level HTTP services want to implement caching, logging, or anything else,
the higher-level services don't have to know about it,
and can create their own independent improvements on top.

When we come back to the component,
we find that it's just as straightforward as we left it:

```typescript
export const sortBlogsByDate = dir => blogs =>
  blogs.slice().sort(/* ... */);

@Component({ /* ... */ })
class BlogPage implements OnInit {

  private blogs = [];

  constructor (private blogService: AuthorizedBlogService) {}

  ngOnInit () { this.loadPage(); }

  private loadPage () {
    this.blogService.getBlogs()
      .map(sortBlogsByDate(`desc`))
      .subscribe(blogs => this.blogs = blogs);
  }
}
```

We could even go so far as to make a service for front-end functionality,
and just use the methods of that helper service for sorting or filtering data.
Whether we take that last step or now,
the payoff is that the view-based component is browser testable,
while nearly all of the other code can now be unit tested outside of the browser.

The real world may not be quite so cut and dry,
but that is even more reason to keep code separated along these boundaries
right from the start of the project.
As programmers become more comfortable with service-based architectures,
that could well become a common way to handle complexity.

This pattern of automatically passing dependencies into objects that request them
is called **Dependency Injection**.
It's a powerful tool,
and one that Angular is specifically built around.
It does have some pitfalls,
which we will discuss in a later chapter,
but as a general rule,
if you aren't writing a Component, a Filter, a Module,
or one of a few other specific types,
what you are creating almost certainly can and probably should be turned into a service.

While there is a lot to be said for the simplifying benefits of `@Injectable` services,
there are some very important caveats.

1.  **Where did all of my design patterns from AngularJS and other frameworks go?**

    There are fewer cut and dry (or cut and paste) solutions to use as templates
    in a service-based architecture.
    This lets us pick a style for a project to best fit the task at hand,
    and then pick a different style for the next project if it would be more suitable.
    The downside is that doing this requires more discipline and dilligence,
    good communication between developers,
    and a good understanding of coding practices,
    *especially* early in the project and as new members come on.

2.  **Why do these two components leak data into one another when they use the same service?**

    A service within a module is treated as a singleton.
    This doesn't mean "a class with a private constructor which ensures only a single instance",
    but rather:

    ```javascript
    // something like this
    const singleInstance = {};
    // or this
    const onlyCalledOnce = getSomeObject();
    ```

    Any class passed as an injectible service will be instantiated one time,
    and that cached object will be passed around to components that wish to use it.
    If that object maintains state,
    and the clients can see it,
    data leakage is possible.
    The solution is to design services as streams,
    and to have client classes slice what they need out of those streams.

3.  **Why don't these two components leak data into one another when they should be using the same service?**

    When we said that services were instantiated exactly once, we were mostly telling the truth,
    but only mostly..
    The main reason that this isn't always the case is Modules.
    Without going down the rabbit-holes of their what and why,
    we can provide services downstream from where they are injected ("Provided),
    but not upstream.
    If a service is provided in the `Parent` module,
    then the `Child` modules can receive the same instance.
    The `Grandparent` module, however, will not get access to that instance.

    The reasons are largely to do with lazy loading of content,
    bundling,
    and the like.
    For lazy loading to work,
    services can not be depended upon by systems where the service is only included after the fact,
    This is especially true given that each module would be sharing the same instance,
    and the newly loaded module could be starting with a service in a completely arbitrary and unexpected state.
    For this reason,
    services flow down through the dependency tree of modules/providers
    as it's known at the time of generation.

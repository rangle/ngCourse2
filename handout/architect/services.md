# Services

To understand the real value in services, it’s probably better to see some of the problems they solve, first.

Let’s have a look at some code that might feel familiar.  
For now, we’ll focus on a component that shows blog posts that the user is allowed to see. The first pass at “getting it done” might look like the following.

```typescript
@Component({ /* ... */}) class BlogPage implements OnInit {
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

  private sortBlogsByDate (direction) { this.blogs.sort(/* ... */); }
}
```

That block of code could certainly get you over the finish-line. It also looks like that HTML component is doing way too much, and knows too much about your system. What happens in a couple of months, when it needs to be fixed? What about extensions? Reuse? How do you test it? How many places in your app are going to need the URLs modified, or the data extraction modified, when the API changes?

In his book on refactoring, Martin Fowler suggested a technique called "Extract Method". His point was that moving chunks of code to their own descriptively named methods would help make the class easier to read and work with.

```typescript
@Component({ /* ... */ }) class BlogPage implements OnInit {
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
  private filterBlogsByAccess (user) { /* this.blogs = ... */ }
  private sortBlogsByDate (direction) { /* this.blogs =  ... */ }
}
```

To my eye, this seems a little bit easier to follow. I’d like to imagine that Fowler would agree. I've got a `loadPage` method that worries itself about the concept of loading and filtering data, and it lets the other sections of the class worry about the details of what I want to do, so that `loadClass` can focus on the concepts, instead.
With some of the noise cleared out of the way, it becomes easier to see that I can optimize away the second call for data, if `this.blogs` is null.

There are still some real problems with this code, though. While most of them have gotten better, some have actually gotten worse.

Have you spotted the likely security concern, yet? All of the code thusfar has been mutating `this.blogs` in place, and waiting for the `user` to be retrieved so that the list of blogs could be filtered. But that means the unfiltered list of blogs is likely being shown, while we’re waiting, given that we keep referring to `this.blogs` as the place to store view-friendly data. This is even harder to spot in the second example than the first. The code here is both easier and harder to maintain, for exactly that reason.

Even without the security problem, there are other troubles this code has. If you are a fan of Robert ”Uncle Bob” Martin, you may already be shaking your head at the violations of the **Single Responsibility Principle**. A component should have exactly one reason to change; only the head of one department should be bugging you for that code to be fixed or modified. Angular Components exist for the sole purpose of showing the data on the screen and reacting to users interacting with that view. Anything beyond that one purpose is almost always beyond what the class should be responsible for.

This code is still not easily testable, either. All of the methods are private, to protect the data being changed by outside parties. That also means that they are protected from testing by outside libraries. The only way to test this class is to instantiate it with a real or fake HTTP service, insert it onto the page, and test that you see the expected data. If we feel like there are a lot of steps in between that should be separately testable, then that is another sign that we are likely breaking the aforementioned **SRP**.

Let’s try one more refactoring. This time, we’ll apply Fowler’s technique on single functions, instead of methods.

```typescript
const fetchJSON = (http, url) =>
  http.get(url).map(response => response.json());

// returns a new array filled with old values
const filterByUserAccess = user => blogs =>
  blogs.filter(/* ... */);

// returns new array filled with old values
const sortBlogsByDate = direction => blogs =>
  blogs.slice().sort(/* ... */);

// load user first, instead, to prevent leaking data
const fetchFilteredBlogs = http => {
  const userStream = fetchJSON(http, `/api/users/me/`);
  const blogStream = fetchJSON(http, `/api/blogs/`)
    .map(({blogs}) => blogs);
  const filterStream = userStream.mergeMap(user =>
    blogStream.filter(filterByUserAccess(user)));
  return filterStream;
};

@Component({ /* ... */ }) class BlogPage implements OnInit {
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

This time the component is absolutely tiny. It knows nothing about users or user access, or URLs. The function that is responsible for building the filtered stream of blogs knows nothing about views, so there is never any danger of showing unauthorized blogs on the page, while waiting. In fact, most of the stream building can be flattened, now that we aren’t mixing view code with data code, and we can see that it’s barely possible for us to have the same error we previously did.

The functions are all safe to be exported and tested, as they aren't tied to the functioning of any one class or any one class instance, so having access to them shouldn’t corrupt the behaviour of any running class instance. Each of these functions is built to take input and return output, without mutating the input or otherwise changing the outside world. Functional programmers call these “pure” functions. We can also see that there are a bunch of different purposes for these functions: some of them are very low-level, accessing and parsing JSON data; some of them operate at a business level, working with data that is important to the business and the product; some of them are focused on helping the view do its job.

There are really only a couple of problems left. The first is that I don’t want to have to write these helper functions on every page. If they’ve now been made safe for reuse, I want to take advantage of that. Once I do that, I don’t want to manually pass a lot of data back and forth, between a lot of functions and objects; I would like a system that makes that aspect easier than passing `http` all the way through.

Both of these problems can be solved via **Services**.

Let’s have a look.

```typescript
// other dependenices ...
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

I’m using `@Injectable` to make a service of my own. The size of my service is miniscule. And this service is clearly about doing one thing: converting user data from the server into some formally typed data that the client is going to use.


```typescript
// ... dependencies ...
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

My new `AuthorizedBlogService` can import lower level services, like the services that load blogs and users. Instead of worrying about low level concerns like HTTP, it can focus on business level concerns, like who is allowed to see which content. It should be crystal clear what each of these services is doing. Moreover, if the lower-level HTTP services want to implement caching, the higher-level services shouldn’t have to know about it, and should also be able to create their own, on top.


When we come back to the component, we find that it's just as straightforward as we left it the last time.

```typescript
// ... dependencies ...

export const sortBlogsByDate = dir => blogs =>
  blogs.slice().sort(/* ... */);

@Component({ /* ... */ }) class BlogPage implements OnInit {
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

I could even go so far as to make a service for front-end functionality, and just use methods of that helper service for sorting or filtering end-user data.

The view-based component is browser testable; nearly all of the other code is simply unit testable, now.

The real world may not be quite so cut and dry, but that is even more reason to consider keeping code separated along these boundaries early in the project.

This pattern of automatically passing dependencies into objects that request them is called **Dependency Injection**. It's a powerful tool, and one that Angular is specifically built around. This comes with advantages and weaknesses, but for the purpose of this section, be sure to take advantage of Angular’s injector. There will be other chapters dedicated to removing some of the weaknesses of injector systems.

With all of that said, you might wonder when *not* to use services, if they are so useful. When it comes to Angular, the answer is pretty straightforward: if you aren’t writing a Component, a Filter, a Module, or one of a few other specific types, you are likely writing something that could be a service (or could be extracted into one).


# NgFor Directive

The `ngFor` directive is a way of repeating a template by using each item of an iterable as that template's context.

```typescript
@Component({
  selector: 'app',
  template: `
    <for-example *ngFor="let episode of episodes" [episode]="episode">
      {{episode.title}}
    </for-example>
  `
})
export class AppComponent {
  episodes: any[] = [
    { title: 'Winter Is Coming', director: 'Tim Van Patten' },
    { title: 'The Kingsroad', director: 'Tim Van Patten' },
    { title: 'Lord Snow', director: 'Brian Kirk' },
    { title: 'Cripples, Bastards, and Broken Things', director: 'Brian Kirk' },
    { title: 'The Wolf and the Lion', director: 'Brian Kirk' },
    { title: 'A Golden Crown', director: 'Daniel Minahan' },
    { title: 'You Win or You Die', director: 'Daniel Minahan' },
    { title: 'The Pointy End', director: 'Daniel Minahan' }
  ];
}
```
[View Example](https://plnkr.co/edit/qXH6rcUAZIIHUuAEKwa8?p=preview)

The `ngFor` directive has a different syntax from other directives we've seen. If you're familiar with the [for...of statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), you'll notice that they're almost identical. `ngFor` lets you specify an iterable object to iterate over and the name to refer to each item by inside the scope. In our example, you can see that `episode` is available for interpolation as well as property binding. The directive does some extra parsing so that when this is expanded to template form, it looks a bit different:


```typescript
@Component({
  selector: 'app',
  template: `
    <template ngFor [ngForOf]="episodes" let-episode>
      <for-example [episode]="episode">
        {{episode.title}}
      </for-example>
    </template>
  `
})
```
[View Example](https://plnkr.co/edit/qXH6rcUAZIIHUuAEKwa8?p=preview)

Notice that there is an odd `let-episode` property on the template element. The `ngFor` directive provides some variables as context within its scope. `let-episode` is a context binding and here it takes on the value of each item of the iterable. `ngFor` also provides some other values that can be bound to:

- _index_ - position of the current item in the iterable starting at `0`
- _first_ - `true` if the current item is the first item in the iterable
- _last_ - `true` if the current item is the last item in the iterable
- _even_ - `true` if the current index is an even number
- _odd_ - `true` if the current index is an odd number


```typescript
@Component({
  selector: 'app',
  template: `
    <for-example
      *ngFor="let episode of episodes; let i = index; let isOdd = odd"
      [episode]="episode"
      [ngClass]="{ odd: isOdd }">
      {{i+1}}. {{episode.title}}
    </for-example>

    <hr/>

    <h2>Desugared</h2>

    <template ngFor [ngForOf]="episodes" let-episode let-i="index" let-isOdd="odd">
      <for-example [episode]="episode" [ngClass]="{ odd: isOdd }">
        {{i+1}}. {{episode.title}}
      </for-example>
    </template>
  `
})
```
[View Example](https://plnkr.co/edit/YFkwmcMiiEuuEVThgpKG?p=preview)

## trackBy ##

Often `ngFor` is used to iterate through a list of objects with a unique ID field. In this case, we can provide a `trackBy` function which helps Angular keep track of items in the list so that it can detect which items have been added or removed and improve performance.

Angular 2 will try and track objects by reference to determine which items should be created and destroyed. However, if you replace the list with a new source of objects, perhaps as a result of an API request - we can get some extra performance by telling Angular 2 how we want to keep track of things.

For example, if the `Add Episode` button was to make a request and return a new list of episodes, we might not want to destroy and re-create every item in the list. If the episodes have a unique ID, we could add a `trackBy` function:

```typescript
@Component({
  selector: 'app',
  template: `
  <button (click)="addOtherEpisode()" [disabled]="otherEpisodes.length === 0">Add Episode</button>
    <for-example
      *ngFor="let episode of episodes;
      let i = index; let isOdd = odd;
      trackBy: trackById" [episode]="episode"
      [ngClass]="{ odd: isOdd }">
      {{episode.title}}
    </for-example>
  `
})
export class AppComponent {

  otherEpisodes: any[] = [
    { title: 'Two Swords', director: 'D. B. Weiss', id: 8 },
    { title: 'The Lion and the Rose', director: 'Alex Graves', id: 9 },
    { title: 'Breaker of Chains', director: 'Michelle MacLaren', id: 10 },
    { title: 'Oathkeeper', director: 'Michelle MacLaren', id: 11 }]

  episodes: any[] = [
    { title: 'Winter Is Coming', director: 'Tim Van Patten', id: 0 },
    { title: 'The Kingsroad', director: 'Tim Van Patten', id: 1 },
    { title: 'Lord Snow', director: 'Brian Kirk', id: 2 },
    { title: 'Cripples, Bastards, and Broken Things', director: 'Brian Kirk', id: 3 },
    { title: 'The Wolf and the Lion', director: 'Brian Kirk', id: 4 },
    { title: 'A Golden Crown', director: 'Daniel Minahan', id: 5 },
    { title: 'You Win or You Die', director: 'Daniel Minahan', id: 6 }
    { title: 'The Pointy End', director: 'Daniel Minahan', id: 7 }
  ];

  addOtherEpisode() {
    // We want to create a new object reference for sake of example
    let episodesCopy = JSON.parse(JSON.stringify(this.episodes))
    this.episodes=[...episodesCopy,this.otherEpisodes.pop()];
  }
  trackById(index: number, episode: any): number {
    return episode.id;
  }
}
```

To see how this can affect the `ForExample` component, let's add some logging to it.

```typescript
export class ForExampleComponent {
  @Input() episode;

  ngOnInit() {
    console.log('component created', this.episode)
  }
  ngOnDestroy() {
    console.log('destroying component', this.episode)
  }
}
```
[View Example](https://plnkr.co/edit/apNLg8?p=preview)

When we view the example, as we click on `Add Episode`, we can see console output indicating that only one component was created - for the newly added item to the list.

However, if we were to remove the `trackBy` from the `*ngFor` - every time we click the button, we would see the items in the component getting destroyed and recreated.

[View Example Without trackBy](https://plnkr.co/edit/UxZsqR?p=preview)

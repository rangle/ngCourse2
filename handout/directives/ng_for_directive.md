# NgFor Directive

The `ngFor` directive is a way of repeating a template by using each item of an iterable as that template's context.

```typescript
@Component({
  selector: 'app',
  directives: [ForExampleComponent],
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
    { title: 'You Win or You Die', director: 'Daniel Minahan' }
    { title: 'The Pointy End', director: 'Daniel Minahan' }
  ];
}
```
[View Example](https://plnkr.co/edit/E2Q8Xi6LATpWcXk6bAUQ?p=preview)

The `ngFor` directive has a different syntax from other directives we've seen. If you're familiar with the [for...of statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), you'll notice that they're almost identical. `ngFor` lets you specify an iterable object to iterate over and the name to refer to each item by inside the scope. In our example, you can see that `episode` is available for interpolation as well as attribute binding. The directive does some extra parsing so that when this is expanded to template form, it looks a bit different:


```typescript
@Component({
  selector: 'app',
  directives: [ForExampleComponent],
  template: `
    <template ngFor [ngForOf]="episodes" let-episode>
      <for-example [episode]="episode">
        {{episode.title}}
      </for-example>
    </template>
  `
})
```
[View Example](https://plnkr.co/edit/E2Q8Xi6LATpWcXk6bAUQ?p=preview)

Notice that there is an odd `let-episode` property on the template element. The `ngFor` directive provides some variables as context within its scope. `let-episode` is a context binding and here it takes on the value of each item of the iterable. `ngFor` also provides some other values that can be bound to:

- _index_ - position of the current item in the iterable starting at `0` 
- _first_ - `true` if the current item is the first item in the iterable
- _last_ - `true` if the current item is the last item in the iterable
- _even_ - `true` if the current index is an even number
- _odd_ - `true` if the current index is an odd number


```typescript
@Component({
  selector: 'app',
  directives: [ForExampleComponent],
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
[View Example](https://plnkr.co/edit/GaxhVSjfY8UmHm4T3PNg?p=preview)

## trackBy ##

Often `ngFor` is used to iterate through a list of objects with a unique ID field. In this case, we can provie a `trackBy` function which helps Angular keep track of items in the list so that it can detect which items have been added or removed and improve performance.

Say each item of `episodes` has an ID number property `id`, we could add a `trackBy` function:

```typescript
@Component({
  selector: 'app',
  directives: [ForExampleComponent],
  template: `
    <for-example *ngFor="let episode of episodes; trackBy: trackById" [episode]="episode">
      {{episode.title}}
    </for-example>
  `
})
export class AppComponent {
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

  trackById(index: number, episode: any): number {
    return episode.id;
  }
}
```
## The Angular Module SCAM pattern

Working with Modules can be challenging, especially in large Angular applications. We often find ourselves having to refactor, for a variety of reasons, and this inevitably leads us to our modules. And then, we hit this pain point:


```typescript
@NgModule({
  imports: [
    SharedModule,
    ComponentLibraryModule,
  ],
  // Mind you, in most cases you generally no longer want to declare your services in your modules
  // this is mostly for the sake of this example of a common challenge we have faced and often continue to face
  providers: [
    ConfigService, 
    PromotionService, 
    AppService,
  ],
  declarations: [
    StringSlicePipe,
    CustomerFormatterPipe,
    ShoppingCartDealPipe,
    CurrencyFormatterPipe,
    CustomerCardComponent,
    ShoppingCartComponent,
    CustomerPortalComponent,
  ],
})
export class CustomerPortalModule {}
```

Let's use a hypothetical situation with the above. The shopping cart component needs to be used in a new section of our application, not an uncommon sort of need. So we make a new module, and we declare that Shopping cart inside, and set up the appropriate routes.

```typescript
@NgModule({
  declarations: [
    ShoppingCartComponent,
    ReorderPortalComponent,
  ],
})
export class ReorderPortal {}
```

Well, that was hopeful - but this doesn't work. Our Shopping Cart component actually has a few dependencies! Okay no problem, we know that we can check the constructor of a component to see service dependencies, so let's check that.

> Note: We are going to assume for the sake of this example that all the services we are going to reference are provided through our *providers: []* fields in our modules, but the recommendation is to avoid this pattern as much as possible - take advantage of Angular 6+'s *providedIn: "root"* property, available to you in @Provider decorators.

```typescript
@Component({...})
export class ShoppingCartComponent {
...
  
  constructor(private ConfigService) {}
  
...
}
```

Ah! That `ConfigService` that was previously provided to our `CustomerPortalModule` is what we need to get this all working, no problem, we can add it in like so:

```typescript
@NgModule({
  providers: [
    ConfigService,
  ],
  declarations: [
    ShoppingCartComponent,
    ReorderPortalComponent,
  ],
})
export class ReorderPortal {}
```

I'll save you the suspense, this still isn't working! After digging, we see that in fact, the `ConfigService` relies on the `PromotionService`, so we include that. Still no luck.

The next thing to check would be our templates, any components and pipes declared in our ShoppingCartComponent will need to be imported into this new Module, so we do:

```typescript
@NgModule({
  providers: [
    ConfigService,
    PromotionService, // Added
  ],
  declarations: [
    ShoppingCartComponent,
    ReorderPortalComponent,
    CurrencyFormatterPipe, // Added
    CustomerCardComponent, // Added
  ],
})
export class ReorderPortalModule {}
```

You guessed it, still no luck! That is because our recently added `CustomerCard` component also relies on its own dependencies to be provided in any module it uses. I'll end this here, but you can see, this becomes an unending chain of pain.

Often, this is why you see a `SharedModule` pattern utilized so frequently in our Angular Application. If we dump all of our application dependencies in one place, this problem goes away, and we can just pass around a giant shared module, exporting all of its contents and providing them to every Module that needs it.

This _kinda_ works. However, anyone experienced with something like this also understands that the pain of a giant shared Module is just trading in one kind of discomfort for another, and it has a pretty bad code smell to it.

The solution to this problem, actually, ends up being quite simple with the SCAM Pattern.

## What is the SCAM (Single Component Angular Module) pattern in Angular?

[I read this amazing blog post a few years back that changed how I write my angular applications.](https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b)

I recommend reading it and giving the author kudos, because it is fantastic and concise. That being said I will also give a breakdown here to help explain the idea.

Essentially... why not make everything have it's _own_ custom Module? We use Modules to encapsulate similar code, but with the patterns above, we end up in a place where we throw this idea out the window and end up having to work _around_ Angular Modules, just to get our applications running. However, let's try to reimagine the above using the SCAM.

> Again, because I think it's so important to emphasize - for the sake of this example, I will keep the providers imported through the module declarations, however it is _even simpler_ when you use the ProvidedIn: "root" pattern

```typescript
@NgModule({
  declarations: [
    CustomerCardComponent,
    CustomerFormatterPipe,
  ],
  export: [CustomerCardComponent]
})
export class CustomerCardComponentModule {}

```

Everything we need for our `CustomerCard` Component is declared in this module. It's very simple, so you might think '_why bother_', but the SCAM pattern relies on consistency to get the most out of it, and in the end, you'll be happier for it. You can see we also export the Component, and since we don't need this pipe used anywhere else, we sort of lock it behind this module.

Before we move on, Let's go a step further - let's make a module for the CustomerFormatterPipe as well, just IN CASE we need this in the future.

```typescript
@NgModule({
  declarations: [
    CustomerFormatterPipe,
  ],
  export: [CustomerFormatterPipe]
})
export class CustomerFormatterPipeModule {}

```

Then we update our `CustomerCardComponentModule` like so:

```typescript
@NgModule({
  imports: [
    CustomerFormatterPipe,
  ],
  declarations: [
    CustomerCardComponent,
  ],
  export: [CustomerCardComponent]
})
export class CustomerCardComponentModule {}

```

Now, understanding that pattern, lets assume we follow it through for everything else that we have. For example, our `ShoppingCartComponent`!

```typescript
@NgModule({
  // I wont bother with these services, as we really should be making them providedIn: 'root'!
  providers: [
    ConfigService, 
    PromotionService,
  ],
  imports: [
    CustomerCardComponentModule,
    CurrencyFormatterPipeModule,
  ],
  declarations: [
    ShoppingCartComponent,
  ],
  export: [ShoppingCartComponent]
})
export class ShoppingCartComponentModule {}

```

Now our original `CustomerPortalModule` looks like this:

```typescript
@NgModule({
  imports: [
    // SharedModule, Shared modules declarations are no longer needed, as they are explicitly defined in each dependency
    ComponentLibraryModule, // depending on the library you are using, this can also be broken up for each module, and is something I would recommend
    ShoppingCartComponentModule,
  ],
  declarations: [
    CustomerPortalComponent, // as this is the CustomerPortal Module, it is fine to keep in the declaration like so!
  ],
})
export class CustomerPortalComponentModule {}
```

Suddenly, It's actually much clearer What the dependency tree looks like for this module. The `CustomerPortalComponent` really only needs exports from the component library, and the `ShoppingCart`, giving you at a glance, a *much* better idea of what this slice of our application is consuming. Then... what does our `ReorderPortal` look like?

```typescript
@NgModule({
  imports: [
    ShoppingCartComponentModule,
  ],
  declarations: [
    ReorderPortalComponent,
  ],
})
export class ReorderPortalComponentModule {}
```

Now, this is _all we need_ to have our Shopping Cart component usable in our `ReorderPortal`. No fuss, no muss.

# Services

- Prelude (before giving you ivory tower mandates, let's look at why we might want services)

- Code:
  - Component with http calls in methods  
    (~8 lines w/ ellipses)
  - Point out (bullets or a sentence): Maintenance; reuse with different endpoints; caching data; complexity management

- Talk about Refactoring by pulling self-contained processes into their own functions with arguments

- Code:
  - function that represents previous call, with data
    (~3 lines)
  - method which calls the function, passing data
    (~5 lines w/ ellipses)
  - Point out: testable; configurable; maintainable; still not reusable

- Segue and introduce Services (tagged subsection)

- State value proposition and reaffirm benefits
  - create reusable libraries
  - keep business logic out of code that solves different problems and changes at different speeds
  - keep code easily testable
  - separate code by intent

- Code:
  - Show: a barebones service with the pulled out function
  - Show: barebones consumption of that service
  - Point out: providers list, @Injectable
  - Show: second consumer
  - Point out: Singleton nature; care with private state; benefits of private state
  - Show: CLI generation of service, and usage
  - Point out: does not automatically inject into system

- Explain practical factoring of code into multiple services
- explain how services can be used by other services (ie: composition), to shrink code complexity (but increase abstraction complexity)

- How do you know you need a service?
  - Angular answer (any time you don't have a Component/Filter/et cetera)
  - Theoretical answer (it's just a class; when your code intents diverge, split classes)

- Code:
  - Show: a simplified but practical example of a data-access layer used by a business layer, used by a component
  - Point out: separation of concerns, composition, concept of inversion(?)

- Mention common problems
  - Testing services : link to unit testing
  - Hijacking/Overriding the injector for composition needs : link to injector section

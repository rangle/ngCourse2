# Semantic Markup

## Using Proper HTML Elements and Attributes

A common trap when structuring html is using too many divs and marking them up with classes or ids to indicate their role, for example:

```
@Component({
  selector: 'ngc2-app'
  template: `
    <div class="header">
      <div class="navigation">
        <div class="item"><a [routerLink]="['']"><img src="https://angular.io/resources/images/logos/angular2/angular.svg" width="40"></a></div>
        <div class="item"><a [routerLink]="['services']">Services</a></div>
        <div class="item"><a [routerLink]="['process']">Process</a></div>
        <div class="item"><a [routerLink]="['work']">Work</a></div>
      </div>
    </div>
    <router-outlet class="page-content">
    </router-outlet>
  `,
})
```
[View Example](http://plnkr.co/edit/cm3wBDRqIrmxpECiQhg7?p=info)

While it might be obvious to someone reading the HTML or using the application what the purpose of each element is, the class names don't have any semantic meaning for browsers and screen readers. We can give them more information by using the proper HTML elements instead.

```
@Component({
  selector: 'ngc2-app',
  template: `
    <header>
      <nav>
        <ul>
          <li><a [routerLink]="['']"><img src="https://angular.io/resources/images/logos/angular2/angular.svg" width="40" alt="Angular 2 logo"></a></li>
          <li><a [routerLink]="['services']">Services</a></li>
          <li><a [routerLink]="['process']">Process</a></li>
          <li><a [routerLink]="['work']">Work</a></li>
        </ul>
      </nav>
    </header>
    <main aria-live="polite">
      <router-outlet>
      </router-outlet>
    </main>
  `
})
```
[View Example](https://plnkr.co/edit/LHFNBsdcfbRPFnQg1DE8?p=preview)

Here, we use the `header` element instead of a `div`, which lets the browser know that the elements within provide information about the site as a whole rather than about the specific page. 

We replace another `div` with the `nav` element, which lets the browser know the elements within are related to accessing different parts of the page or site. 

We also nest `router-outlet` within a `main` element, which tells the browser that the content loaded into the router outlet is the main content of the page.

There are a couple of new attributes on different elements as well to give the browser even more information. The `alt` attribute has been added to the image to let the browser know that it's a logo image. There's also an `aria-live` attribute on the `main` element.

This attribute is part of larger spec known as [Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/TR/wai-aria/) which we'll go over in detail. This is something that lets screen readers know that the content within the `main` tag will be updated on the client-side after the page has loaded and needs to be watched for updates.


## Roles and ARIA

The ARIA spec was created as a way for content authors a way to provide additional context to the semantics of their application rather than just details on how to render the content. This allows assistive technology to understand what's going on inside an application and relay that information in a structured and streamlined format for users with disabilities.

One of the main concepts in the ARIA spec is the *role*. A [role](https://www.w3.org/TR/wai-aria/roles) defines what the purpose of an html element is within the context of that document or application. Roles are defined by adding an attribute to an html element ie. `role="main"` or are defined by default depending on the html element.

Some examples of roles are [list](https://www.w3.org/TR/wai-aria/roles#list), [button](https://www.w3.org/TR/wai-aria/roles#button) or [navigation](https://www.w3.org/TR/wai-aria/roles#navigation) which are the default roles of `ul`, `button` and `nav` respectively. Sometimes however, you may not want or be able to use the standard html element to represent these objects in your application, for example, you may want to create your own button component with it's own distinct logic. In this case you can make use of the `role` attribute:

```
@Component({
  selector: 'ngc2-notification-button',
  template: `
    <span>{{label}}</span>
  `,
  styles: [`
     :host {
      display: flex;
      width: 80px;
      height: 80px;
      justify-content: center;
      align-items: center;
      background-color: yellow;
      border-radius: 40px;
    }

    :host:hover {
      cursor: pointer;
    }
  `]
})
export class NotificationButtonComponent {
  @Input()
  message = 'Alert!';

  @Input()
  label = 'Notify';

  constructor(private notification: NotificationService) { }

  @HostListener('click', [])
  notify() {
    this.notification.notify(this.message)
  }
}
```
[View Example](https://plnkr.co/edit/aAjNnmeaEPbdfIWo9hPT?p=preview)

This lets you create a component that has the same semantics as a `button` element to screen readers and browsers, but now have the opportunity to fully control the styling of that component as well as inject your own custom logic.


### ARIA attributes

Some native HTML tags have attributes that providers extra context on what's being displayed on the browser. For example, the `img` tag's `alt` attribute  lets the reader know what is being shown using a short description. 

However, native tags don't cover all cases. This is where ARIA fits in. ARIA attributes can provide context on what roles specific elements have in the application or on how elements within the document relate to each other. 

One example of this is modals. Native modals provided by different platforms such as web browsers often have limited customization options, which can make for a poor experience. This necessitates the creation of custom modals. 

A modal component can be given the `role` of [dialog](https://www.w3.org/TR/wai-aria/roles#dialog) or [alertdialog](https://www.w3.org/TR/wai-aria/roles#alertdialog) to let the browser know that that component is acting as a modal. The modal component template can use the ARIA attributes `aria-labelledby` and `aria-described` to describe to readers what the title and purpose of the modal is.

*app.component.ts*
```
@Component({
	selector: 'ngc2-app',
	template: `
	  <ngc2-notification-button
	    message="Hello!"
	    label="Greeting"
	    role="button">
	  </ngc2-notification-button>
	  <ngc2-modal
	    [title]="modal.title"
	    [description]="modal.description"
	    [visible]="modal.visible"
	    (close)="modal.close()">
	  </ngc2-modal>
	`
})
export class AppComponent {
  constructor(private modal: ModalService) { }
}
```

*notification-button.component.ts*
```
@Component({
  selector: 'ngc2-modal',
  template: `
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      <div id="modal-title">{{title}}</div>
      <p id="modal-description">{{description}}</p>
      <button (click)="close.emit()">OK</button>
    </div>
  `
})
export class ModalComponent {
  ...
}
```
[View Example](https://plnkr.co/edit/Vvu62nDZ18IkqiAop2A9?p=preview)

ARIA tags can enhance the accessibility of an application, but should by no means be the only accessibility consideration. More information is available in the [WAI-ARIA specification](https://www.w3.org/TR/wai-aria/).

# Universal Components

When writing universal components its important to not explicitly interact with the DOM. The Angular 2 architecture includes a rendering layer that abstracts rendering routines from the application logic. In this rendering layer there is a module `DomRender` that renders views to the browser, which is used in the client side. There is also a module `ServerDomRender` that will maintain a data structure that mimics the browser DOM. It has a method `toString()` which will turn this internal object to an HTML string which will be sent off to the client. The good news is all of this happens under the hood, there is hardly any code to write at all. As long as a component does not directly write to the DOM, then it will be capable of being rendered on the server. This means no `navigator`, `document`, `window` or any other browser provided modules in the global namespace. 

If you do need to write to the DOM then you should use the `Renderer` module, which will abstractly apply your changes to the DOM object, whether that be in a client or server context. Let's say we have a custom directive that will place a black background on any element in which it has been applied to. In order to do this we need to write a style property of `background: #000` on some element in the DOM, how would we do this properly?

```js
import {Component, Directive, Renderer} from 'angular2/angular2';

@Directive({
    selector: '[darkify]'
});

class Darkify {
    constructor(element, renderer: Renderer) {
        renderer.setElementStyle(element, 'background', '#000');
    }
};


@Component({
    selector: 'example',
    directives: [Darkify],
    template: '<div darkify>Renderer example</div>'
});

export class Example {}
```

By using the `renderer` module we can safely write to the DOM, without knowing if the application is running in a browser window, or a node server. Now our JavaScript is truly universal!

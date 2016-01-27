<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Part 12: Angular Universal](#part-12-angular-universal)
    - [Setting up the Server](#setting-up-the-server)
    - [Universal Components](#universal-components)
    - [Capturing Events Using Preboot](#capturing-events-using-preboot)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 12: Angular Universal #

An interesting new feature introduced in Angular 2 is the ability to render Angular 2 views on the server and pass down the HTML to the client. Having the server render the first page of the application speeds up the initial load time considerably as the user is presented with the application almost instantly without needing to wait for angular to load and bootstrap. 

###Setting up the Server
For this example we'll be using Express as our server. Though you can use any server that allows you to use a custom template rendering engine, Express is one of the easiest to use. 

To set up Express to use the Angular2 rendering engine all we need to do is import the module, and pass in the `ng2engine`.

```
var universal = require('modules/universal');
var app = express();

app.engine('.ng2.html', universal.ng2engine);
app.set('view engine', 'ng2.html');
```

Now any files with the .ng2.html extension will be served using the `ng2engine` engine. 


###Universal Components
When writing universal components its important to not explicitly interact with the DOM. The Angular 2 architecture includes a rendering layer that abstracts rendering routines from the application logic. In this rendering layer there is a module `DomRender` that renders views to the browser, which is used in the client side. There is also a module `ServerDomRender` that will maintain a data structure that mimics the browser DOM. It has a method `toString()` which will turn this internal object to an HTML string which will be sent off to the client. The good news is all of this happens under the hood, there is hardly any code to write at all. As long as a component does not directly write to the DOM, then it will be capable of being rendered on the server. This means no `navigator`, `document`, `window` or any other browser provided modules in the global namespace. 

If you do need to write to the DOM then you should use the `Renderer` module, which will abstractly apply your changes to the DOM object, whether that be in a client or server context. Let's say we have a custom directive that will place a black background on any element in which it has been applied to. In order to do this we need to write a style property of `background: #000` on some element in the DOM, how would we do this properly?

```
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

By using the `renderer` module we can safely write to the DOM, without knowing if the application is running in a browser window, or a node server. Now our javascript is truly universal!

###Capturing Events Using Preboot
One of the problems that arises from using server side rendering is the state of the application after its been initial served, and before Angular 2 has gotten a chance to load and bootstrap itself. Though the application is visible, any events registered in that 1-6 second window will be lost. This can make for a poor user experience as the application appears to undergo an initial lag after loading. Fortunately a library has been created to address this issue - prebootjs. It works by including itself when the application is initial loaded, recording any captured events, and then playing those events back into angular once its ready to start processing them. 

There are many more features and examples of preboot, you can check them all out on the [github page](https://github.com/angular/universal/tree/master/modules/preboot).

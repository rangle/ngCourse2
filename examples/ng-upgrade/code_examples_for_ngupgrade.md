#Code Examples for ngUpgrade

###Downgrading Angular2 component to work in Angular1 application

**bootstrap.ts**
        
    import {UpgradeAdapter} from 'angular2/upgrade';
    import {bootstrap} from 'angular2/platform/browser';
	import {NewComponent} from './components/NewComponent/NewComponent';
	declare var angular:any;

	let adapter: UpgradeAdapter = new UpgradeAdapter();

	angular.module('angular1-base').directive('new', adapter.downgradeNg2Component(NewComponent)); 

	adapter.bootstrap(document.body, ['angular1-base']);


**app.html**

	...
	<body>
		<script>
			System.import('bootstrap');

	        angular.module('angular1-base',[]);

    	    angular.module('angular1-base').controller('testController', function(){
        	    this.message = 'Here is a plain old Angular1 controller!';
	        });
		</script>

	    <div ng-controller="testController as testController">
    	    <h1>{{testController.message}}</h1>

        	<new></new>
	    </div>
	</body>
	...


**components/NewComponent/NewComponent.ts**

	import {Component, View} from 'angular2/core';

	@Component({
	    selector: 'new'
	})

	@View({
    	template: "<h1>What you're seeing here is an Angular2 component running in an Angular1 app!</h1>"
	})

	export class New {}



###Upgrading Angular1 component to work in Angular2 

**app.html**
We have an old Angular1 component

	...
	<body>
		<script>
			System.import('bootstrap');

	        angular.module('angular1-base',[]);

    	    angular.module('angular1-base').component('oldcomponent', template: {
    	    	'<b>Old Angular1 component</b>'
    	    });
    	</script>

       	<new></new>
	</body>
	...

We use this old component in an Angular2 component. To make this work call `upgradeNg1Component` on the old component. 

**components/NewComponent/NewComponent.ts**

	import {Component} from 'angular2/core';
    import {bootstrap} from 'angular2/platform/browser';
    
	let adapter: UpgradeAdapter = new UpgradeAdapter();
	
	@Component({
		selector: 'new',
		directives: [adapter.upgradeNg1Component('oldComponent')],
		template: '<h1>New Angular2 component, <oldcomponent></oldcomponent>
	});
	
	export class New {}

Then we can downgrade this new Angular2 component to start using it

**bootstrap.ts**

    import {UpgradeAdapter} from 'angular2/upgrade';
    import {bootstrap} from 'angular2/platform/browser';
	import {NewComponent} from './components/NewComponent/NewComponent';
	declare var angular:any;

	let adapter: UpgradeAdapter = new UpgradeAdapter();

	angular.module('angular1-base').directive('new', adapter.downgradeNg2Component(NewComponent)); 

	adapter.bootstrap(document.body, ['angular1-base']);
	

### Using Angular2 Providers

(might not actually need to use this one)

**bootstrap.ts**

	import {UpgradeAdapter} from 'angular2/upgrade';
	import {HTTP_PROVIDERS} from 'angular2/http';
	
	let adapter: UpgradeAdapter = new UpgradeAdapter();
	
	adapter.addProvider(HTTP_PROVIDERS);
	
	adapter.bootstrap(document.body, ['angular1-base']);

**server.ts**
	
	import {Injectable} from 'angular2/core';
	import {Http} from 'angular2/http';

	@Injectable()
	export default class MyService() {
		constructor(private _http: Http) {}
	}


### Upgrading Angular1 Providers

We have an Angular2 service that uses an Angular1 service

**Angular2Service.ts**

	import {Injectable} from 'angular2/core';
	
	@Injectable()
	class Angular2Service {
		constructor(@Inject('Angular1Service') angular1Service) {
			// 
		}
	}

**Angular1Service.ts**

	angular.module('angular1-base').service('Angular1Service', function () {
		//
	});

To make the Angular1 service injectable all you need to do is upgrade it

**bootstrap.ts**
	
	import {UpgradeAdapter} from 'angular2/upgrade';
	
	let adapter: UpgradeAdapter = new UpgradeAdapter();
	
	adapter.upgradeNg1Provider('Angular1Service');


### Downgrading Angular2 Providers

We have an Angular2 service

**services/Angular2Service.ts**

	import {Injectable} from 'angular2/core';
	
	@Injectable()
	class Angular2Service {
		constructor() {
			//
		}
	}

And downgrade it to use it in an Angular1 component

**services/Angular1Service.ts**
	
	import {Angular2Service} from './services/Angular2Service';
	import {UpgradeProvider} from 'angular2/upgrade';
	
	var Angular2Service = adapter.downgradeNg2Provider(Angular2Service);
	angular.module('angular1-base').factory('Angular2Service', Angular2Service);


**controllers/Angular1Controller.ts**

	angular.module('angular1-base').controller('TestController', function (Angular2Service) {
		// 
	});



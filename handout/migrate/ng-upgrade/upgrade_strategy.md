#  Upgrade Components Strategically 

Services that have no dependencies are excellent candidates for conversion. Once
converted to Angular 2, services can be downgraded to work in Angular 1.x.
Components can follow a similar strategy, with 'leaf' components being converted
before 'root' components.

Possibly the most challenging component/service to upgrade is Angular 1.x's UI
Router library.  This process _might_ be simplified in the future, but for
the moment it's best to upgrade _UI_ Router last.  

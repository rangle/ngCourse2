# AoT

Every Angular application requires a compilation process before they can run in the browser: the enriched components and templates provided by Angular cannot be understood by the browser directly. During the compilation, Angular's compiler also improves the app run-time performance by taking JavaScript VM's feature \(like inline caching\) into consideration.

The initial compiler in AngularJS and Angular is called JiT \(Just-in-Time\) compiler. As for AoT, it stands for the Ahead-of-Time compiler that was recently introduced in Angular. Compared to the JiT compilation performed by Angular at run-time, AoT provides a smaller bundle with faster rendering in the browser. Using AoT, we can reduce the [angular2-starter](https://github.com/rangle/angular2-starter/pull/149) to 428.8 kb compared to the original 1.2 MB and reduce loading times by skipping compilation in the browser.

| Characteristic        | JiT              | AoT                 |
| :-------------------- | :--------------- | :------------------ |
| Compilation target    | Browser          | Server              |
| Compilation context   | Runtime          | Build               |
| Bundle size           | Huge \(~1.2 MB\) | Smaller \(~400 KB\) |
| Execution Performance | -                | Better              |
| Startup time          | -                | Shorter             |

The gist of AoT is moving the compilation from run-time to the building process. That means, first we can remove the JiT compiler \(which is around 523kb\) from the bundle to have a smaller build, and second, the browser can execute the code without waiting for JiT in the run-time which leads to a faster rendering speed.

Early compilation also means that developers can find template bugs without actually running the code and before it reaches to client. This provides a more robust application with higher security because less client-side HTML and JavaScript are `eval`ed. Also, by introducing compiled code in the building process, AoT makes the application more tree-shakable and open to various other optimizations. Bundlers like Rollup and Google Closure can take that advantage and effectively decrease the bundle size.

Besides, AoT compiler also inlines HTML templates and CSS files and help reduce the amount of asynchronous requests sent by the application. \(Note: this caused a config bug that we will mention in a latter section\)

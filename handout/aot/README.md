# AoT in Angular 2

Every Angular application requires a compilation process before they can run in the browser. The enriched components and templates provided by Angular cannot be understood by the browser directly and during the compilation, Angular's compiler also improves run-time efficiencies of the code by taking JavaScript VM's feature (like inline caching) into consideration.

AoT stands for Ahead-of-Time compiler for Angular applications. Compared to the original JiT (Just-in-Time) compilation performed by Angular 2 at run-time, AoT provides a smaller bundle with faster rendering in the browser. Using AoT, we can reduce the [angular2-starter](https://github.com/rangle/angular2-starter/pull/149) to 428.8 kb compared to the original 1.2 MB and reduce loading times by skipping compilation at run time.

| Characteristic        | JiT          | AoT               |
| --------------------- | ------------ | ----------------- |
| Compilation target    | Browser      | Server            |
| Compilation context   | Runtime      | Build             |
| Bundle size           | Huge (~1.2 MB) | Smaller (~400 KB) |
| Execution Performance | -            | Better            |
| Startup time          | -            | Shorter           |


The gist of AoT is moving the compilation from run-time to the building process. That is also the reason why AoT can have a smaller bundle size and faster rendering speed:

- We can remove the JiT compiler (which is around 523kb) from the bundle.
- Browser can execute the code without waiting for JiT to compile it.

Early compilation also means that developers can find template bugs without actually running the code and before it reaches to client. This provides a more robust application with higher security because less client-side HTML and JavaScript are used.

Besides, AoT compiler also inlines HTML templates and CSS files and help reduce the amount of asynchronous requests sent by the application. (Note: this caused a config bug that we will mention in latter section)

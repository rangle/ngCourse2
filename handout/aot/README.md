# AoT in Angular 2

Every Angular application requires a compilation process before they can run in the browser. The enriched components and templates provided by Angular cannot be understood by the browser directly. The process where Angular-specific code gets converted to browser-friendly code is called compilation. And AoT stands for Ahead-of-Time compiler for Angular applications. Compared to the original JiT (Just-in-Time) compilation performed by Angular 2 at run-time, AoT provides a much smaller bundle with faster rendering in the browser. Using AoT, we can reduce the [angular2-starter](https://github.com/rangle/angular2-starter/pull/149) to 428.8 kb compared to the original 1.2 MB and reduce loading times by skipping compilation at run time.

| Characteristic        | JiT          | AoT               |
| --------------------- | ------------ | ----------------- |
| Compilation target    | Browser      | Server            |
| Compilation context   | Runtime      | Build             |
| Bundle size           | Huge (~1.2 MB) | Smaller (~400 KB) |
| Execution Performance | -            | Better            |
| Startup time          | -            | Shorter           |

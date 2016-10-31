# Why AoT is working better?

One gist of AoT is moving the compilation from run-time to the building process. That is also the reason why AoT leads to a smaller bundle size and faster rendering speed:
- We can remove the JiT compiler (which is around 250kb) from the bundle.
- Browser can execute the code without waiting for JiT to compile it.

Early compilation also means that developers can find template bugs without actually running the code and before it reaches to client. This provides a more robust application with higher security because less client-side HTML and JavaScript are used.

Besides, AoT compiler also inlines HTML templates and CSS files and help reduce the amount of asynchronous requests sent by the application. (Note: this caused a config bug that we will mention in latter section)

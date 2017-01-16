# Capturing Events Using Preboot

One of the problems that arises from using server side rendering is the state of the application after its been initial served, and before Angular has gotten a chance to load and bootstrap itself. Though the application is visible, any events registered in that 1-6 second window will be lost. This can make for a poor user experience as the application appears to undergo an initial lag after loading. Fortunately a library has been created to address this issue - `prebootjs`. It works by including itself when the application is initial loaded, recording any captured events, and then playing those events back into angular once its ready to start processing them. 

There are many more features and examples of preboot, you can check them all out on the [github page](https://github.com/angular/universal/tree/master/modules/preboot).

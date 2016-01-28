# Part 4: Observables

One of the new improved features introduced in Angular 2 are Observables. Observables aren't an Angular 2 specific feature, its a proposed standard for managing async data that will be included in the release of ES7. Observables are similar to Promises, but differ in a few major ways. Perhaps the biggest difference is that Observables open up a continuous channel of communication in which multiple values of data can be emitted over time. From this we get a pattern of dealing with data by using array like operations to parse, modify and maintain data. Angular 2 uses Observables extensively, you'll see them in the HTTP service and the event system. 


<iframe height='268' scrolling='no' 
    src='//codepen.io/winkerVSbecks/embed/xZjGZo/?height=268&theme-id=21941&default-tab=result' 
    frameborder='no' 
    allowtransparency='true' 
    allowfullscreen='true' 
    style='width: 100%;'>
</iframe>
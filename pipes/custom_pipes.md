# Custom Pipes

Angular allows you to create your own custom pipes. Each custom pipe implementation must:

- have the `@Pipe` decorator with pipe metadata that has a `name` property. This value will be used to call this pipe in template expressions. It must be a valid JavaScript identifier.

- implement the `PipeTransform` interface's transform method. This method takes the value being piped and a variable number of arguments of any type and return a transformed \("piped"\) value.

A example of creating custom pipes is shown below:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = [
  'Bytes',
  'Kilobytes',
  'Megabytes',
  'Gigabytes',
  'Pettabytes',
  'Exabytes',
  'Zettabytes',
  'Yottabytes',
];

@Pipe({
  name: 'formatFileSize',
})
export class FormatFileSizePipe implements PipeTransform {
  transform(sizeInBytes: number, longForm: boolean): string {
    const units = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;

    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);

    const size = sizeInBytes / Math.pow(1024, power); // size in new units
    const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals
    const unit = units[power];

    return `${formattedSize} ${unit}`;
  }
}
```

You can use your custom pipe the same way you use built-in pipes. Before using the custom pipe, it must be included in the declarations array of the AppModule. To make use of pipe within the class, you must add it to the providers array of your NgModule. Each colon-delimited parameter in the template maps to one method argument in the same order.
ss
[View Example](https://stackblitz.com/github/rangle/angular-book-examples/tree/feat-custom-pipes?file=src%2Fapp%2Ffile-size.pipe.ts)

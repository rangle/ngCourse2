'format es6'; // force SystemJS to transpile exercise

let solution = () => {
  type numOrString = number | string;

  enum Numbers {
    sixteen,
    twentyThree
  }

  function clear() {
    const element = document.getElementById('example');
    element.innerHTML = '';
  }

  function write(...args: numOrString[]) {
    const element = document.getElementById('example');
    element.innerHTML += args.reduce((prev, curr) => prev + curr + ' ', '');
  }

  function add(a: number, b: number) {
    return a + b;
  }

  function concat(a: string, b: string) {
    return a + b;
  }

  function writeFromEnum(given: Numbers) {
    switch (given) {
      case Numbers.sixteen:
        return 16;
      case Numbers.twentyThree:
        return 23;
      default:
        return 'Type Error';
    }
  }

  function fortyTwoIfTrue(value: boolean) {
    if (value === true) {
      return 42;
    }
  }

  write(
    add(1, '3'),
    add('3', 5),
    concat(1, 5),
    writeFromEnum(16),
    writeFromEnum(23),
    fortyTwoIfTrue(42)
  );
}

solution();

'format es6'; // force SystemJS to transpile

interface Point {
  x: number;
  y: number;
}

interface Box {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface Colour {
  r: number;
  g: number;
  b: number;
  a?: number;
}

function createPoint(x, y): Point {
  return { x, y };
}

function createBox(p1: Point, p2: Point) {
  return {
    x1: p1.x,
    y1: p1.y,
    x2: p2.x,
    y2: p2.y
  }
}

function validateColourValue(v: number): number {
  return v >= 0 && v <= 255 ? v : 0;
}

function createColour(r: number, g: number, b: number, a: number = 1): Colour {
  return {
    r: validateColourValue(r),
    g: validateColourValue(g),
    b: validateColourValue(b),
    a: a >= 0 && a <= 1 ? a : 1
  };
}

function colourToString(colour: Colour): String {
  return `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`;
}

function createBoxElement(
  box: Box, colour: Colour = { r: 0, g: 0, b: 100 }): HTMLElement {
  const boxElement = document.createElement('div');
  const width = Math.abs(box.x2 - box.x1);
  const height = Math.abs(box.y2 - box.y1);
  const left = box.x1 < box.x2 ? box.x1 : box.x2;
  const top = box.y1 < box.y2 ? box.y1 : box.y2;
  const colourString = colourToString(colour);
  const style = `position:absolute;background:${colourString};` +
    `width:${width}px;height:${height}px;left:${left}px;top:${top}px`;
  boxElement.setAttribute('style', style);
  return boxElement;
}

function drawBoxElement(boxElement: HTMLElement): void {
  const element = document.getElementById('example');
  element.appendChild(boxElement);
}

const box = createBox(createPoint(10, 10), createPoint(60, 60));
const boxEl = createBoxElement(box, createColour(0, 255, 0, 1));

drawBoxElement(boxEl);

type Point = { x: number, y: number };

export { sample, computeArea }

function isInsideCircle(p: Point) {
  return p.x * p.x + p.y * p.y < 1.0;
}
function samplePoint(): Point {
  return { x: Math.random(), y: Math.random() };
}

function sample(countSample: number): number {
  let countInside = 0;
  for (let i = 0; i < countSample; i++) {
    const p = samplePoint();
    if (isInsideCircle(p))
      countInside++;
  }
  return countInside;
}

function computeArea(countAll: number, countInside: number) {
  return 4 * countInside / countAll;
}
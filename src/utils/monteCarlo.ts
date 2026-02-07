import type { Point } from "../types/dataTypes";

export { sample, computeArea }

function isInsideCircle(p: Point) {
  return p.x * p.x + p.y * p.y < 1.0;
}
function samplePoint(): Point {
  return { x: Math.random(), y: Math.random() };
}

/**
 * サンプル数だけランダムな点を用意し、円の内部に入った点の数を返す
 * @param countSample 用意するサンプル数
 * @returns 円の内部だった点の数
 */
function sample(countSample: number): number {
  let countInside = 0;
  for (let i = 0; i < countSample; i++) {
    const p = samplePoint();
    if (isInsideCircle(p))
      countInside++;
  }
  return countInside;
}

/**
 * 円の面積を計算する関数
 * @param countAll サンプルすべての数
 * @param countInside サンプルの内、円の内部である点の数
 * @returns 求めた面積 (countAllが0で計算できないとき=>-1)
 */
function computeArea(countAll: number, countInside: number) {
  if (countAll === 0)
    return -1;
  return 4 * countInside / countAll;
}
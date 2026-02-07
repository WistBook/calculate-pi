
const BASE = 300;
const MAX_INCREMENT = 1000000;

/**
 * これまでのサンプル数に応じて次のサンプル数を計算する
 * @param samples これまでのサンプル数
 * @returns 新しく生成するサンプル数
 */
export function calcIncrement(samples: number): number {
  if (samples === 0) {
    return 100;
  }
  const incrementBy = Math.floor(Math.sqrt(samples) * BASE);
  return Math.min(incrementBy, MAX_INCREMENT);
}
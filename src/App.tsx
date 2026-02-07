import { useState } from "react";
import { sample, computeArea } from "./utils/monteCarlo";
import { calcIncrement } from "./utils/calcIncrement";

function App() {
  const SAMPLES_KEY = "samples";
  const INSIDE_KEY = "inside";
  const DATE_KEY = "date";

  function getNumber(key: string): number | undefined {
    const temp = localStorage.getItem(key);
    return temp ? JSON.parse(temp) : undefined;
  }
  function getDate(key: string): Date | undefined {
    const temp = localStorage.getItem(key);
    const parsed: string | undefined = temp ? JSON.parse(temp) : undefined;
    return parsed ? new Date(parsed) : undefined;
  }

  const [countAll, setCountAll] = useState<number | undefined>(() => getNumber(SAMPLES_KEY));
  const [countInside, setCountInside] = useState<number | undefined>(() => getNumber(INSIDE_KEY));
  const [pi, setPi] = useState<number | undefined>(() => {
    if (countAll === undefined || countInside === undefined) return undefined;
    return computeArea(countAll, countInside);
  });
  const today = new Date();
  const updatedAt = getDate(DATE_KEY);
  const [isUpdated, setIsUpdated] = useState<boolean>(() => {
    if (updatedAt === undefined) return false;
    return today.toDateString() === updatedAt.toDateString();
  })

  function getDateString(date: Date): string {
    return `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`;
  }

  function storeData(samples: number, inside: number, updatedAt: Date) {
    localStorage.setItem(SAMPLES_KEY, JSON.stringify(samples));
    localStorage.setItem(INSIDE_KEY, JSON.stringify(inside));
    localStorage.setItem(DATE_KEY, JSON.stringify(updatedAt));
    console.log(`saved : samples - ${samples}, inside - ${inside}, updatedAt - ${updatedAt}`);
  }

  function setResult(samples: number, inside: number, result: number) {
    setCountAll(samples);
    setCountInside(inside);
    setPi(result);
  }

  function AddSamples() {
    setIsUpdated(true);

    let samples: number;
    let inside: number;
    let incrementBy: number;
    if (countAll === undefined || countInside === undefined) {
      samples = 0;
      inside = 0;
      incrementBy = 100;
    }
    else {
      samples = countAll;
      inside = countInside;
      incrementBy = calcIncrement(countAll);
    }
    samples += incrementBy;
    inside += sample(incrementBy);
    const result = computeArea(samples, inside);

    storeData(samples, inside, today);
    setResult(samples, inside, result);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-green-200">
      <header className="p-4 text-4xl">
        <div className="pb-2 border-b-2 border-emerald-600">
          モンテカルロサンプリング
        </div>
      </header>
      <main className="pl-8">
        <div className="p-1 text-center">
          <div className="border-b mx-48">前回の日付</div>
          <div className="p-2">
            {updatedAt === undefined ? "---- / -- / --" : getDateString(updatedAt)}
          </div>
          <button onClick={AddSamples} disabled={isUpdated} className={`bg-transparent font-semibold py-2 px-4 border rounded ${isUpdated ? "text-gray-700 border-gray-500" : "hover:bg-emerald-500 text-emerald-700 hover:text-white border-emerald-500 hover:border-transparent"}`}>
            サンプル数を増やす
          </button>
        </div>
        <div className="pt-6">
          <div className="text-center border-b mx-48">計算結果</div>
          <div className="pl-8">
            <p className="p-1">
              <span className="inline-block w-32">
                サンプルの合計数
              </span>
              <span>: </span>
              <span className="inline-block">
                {countAll === undefined ? "- データ無し -" : countAll}
              </span>
            </p>
            <p className="p-1">
              <span className="inline-block w-32">
                円内部の数
              </span>
              <span>: </span>
              <span className="inline-block">
                {countInside === undefined ? "- データ無し -" : countInside}
              </span>
            </p>
            <p className="p-1">
              <span className="inline-block w-32">
                計算結果
              </span>
              <span>: </span>
              <span className="inline-block">
                {pi === undefined ? "- データ無し -" : pi}
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

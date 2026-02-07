import { StateCalculation } from "./hooks/stateCalculation"

function App() {
  const { data, pi, isUpdated, addSamples } = StateCalculation();

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
            {data.lastUpdate}
          </div>
          <button onClick={addSamples} disabled={isUpdated} className={`bg-transparent font-semibold py-2 px-4 border rounded ${isUpdated ? "text-gray-700 border-gray-500" : "hover:bg-emerald-500 text-emerald-700 hover:text-white border-emerald-500 hover:border-transparent"}`}>
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
                {data.samples ? data.samples : "- データ無し -"}
              </span>
            </p>
            <p className="p-1">
              <span className="inline-block w-32">
                円内部の数
              </span>
              <span>: </span>
              <span className="inline-block">
                {data.inside ? data.inside : "- データ無し -"}
              </span>
            </p>
            <p className="p-1">
              <span className="inline-block w-32">
                計算結果
              </span>
              <span>: </span>
              <span className="inline-block">
                {pi !== -1 ? pi : "- データ無し -"}
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

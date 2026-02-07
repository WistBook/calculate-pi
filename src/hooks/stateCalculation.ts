import { useState } from "react";
import type { StorageData } from "../types/dataTypes";
import { loadData, saveData } from "../utils/storage";
import { getToday, hasUpdatedToday } from "../utils/date";
import { calcIncrement } from "../utils/calcIncrement";
import { computeArea, sample } from "../utils/monteCarlo";

/**
 * @returns ***dataの数値は0, piは-1を異常データとして処理する必要がある。***
 */
export function StateCalculation() {
  const [data, setData] = useState<StorageData>(loadData);
  const today = getToday();
  const isUpdated = hasUpdatedToday(today, data.lastUpdate);

  function addSamples() {
    if (isUpdated)
      return;

    const incrementBy = calcIncrement(data.samples);
    const newData: StorageData = {
      samples: data.samples + incrementBy,
      inside: data.inside + sample(incrementBy),
      lastUpdate: today,
    };

    setData(newData);
    saveData(newData);
  }
  const pi = computeArea(data.samples, data.inside);
  return { data, pi, isUpdated, addSamples };
}
import type { StorageData } from "../types/dataTypes";

const KEY = "storage";

export function loadData(): StorageData {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    return {
      samples: 0,
      inside: 0,
      lastUpdate: "---- / -- / --",
    };
  }
  return JSON.parse(raw);
}

export function saveData(data: StorageData) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
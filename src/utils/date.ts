export function getToday(): string {
  const date = new Date();
  return `${date.getFullYear()} / ${(date.getMonth() + 1).toString().padStart(2, "0")} / ${(date.getDate()).toString().padStart(2, "0")}`;
}

export function hasUpdatedToday(today: string, lastUpdate: string) {
  return today === lastUpdate;
}
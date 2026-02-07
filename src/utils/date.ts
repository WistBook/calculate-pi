export function getToday(): string {
  const date = new Date();
  return `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`;
}

export function hasUpdatedToday(today: string, lastUpdate: string) {
  return today === lastUpdate;
}
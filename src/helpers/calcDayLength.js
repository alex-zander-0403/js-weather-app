export function calcDayLenght(sunrise, sunset) {
  const diffSeconds = sunset - sunrise;
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
}

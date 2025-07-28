export function formatTime(time, timeZone) {
  const localTime = time + timeZone;

  const date = new Date(localTime * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
}

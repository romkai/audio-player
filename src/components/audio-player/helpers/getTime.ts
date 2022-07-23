export default function getTime(seconds: number) {
  const roundedSeconds = Math.floor(seconds || 0);
  const mins = Math.floor(roundedSeconds / 60);
  const secs = roundedSeconds - mins * 60;
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

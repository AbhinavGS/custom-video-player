const customFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatDuration(time) {
  let formattedTime;
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  if (hours === 0)
    formattedTime = `${customFormatter.format(
      minutes
    )}:${customFormatter.format(seconds)}`;
  else
    formattedTime = `${customFormatter.format(hours)}:${customFormatter.format(
      minutes
    )}:${customFormatter.format(seconds)}`;

  return formattedTime;
}

export { formatDuration };

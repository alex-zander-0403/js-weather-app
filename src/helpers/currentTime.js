export function renderCurrentTime() {
  const nowEl = document.querySelector(".now");

  const currentTime = new Date();
  const formattedTime = formatDate(currentTime);

  nowEl.textContent = `Сейчас: ${formattedTime}`;
}

function formatDate(currentTime) {
  const date = currentTime.toLocaleDateString("ru", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const time = currentTime.toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${date}, ${time}`;
}

setInterval(renderCurrentTime, 60000);

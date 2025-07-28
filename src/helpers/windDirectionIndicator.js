export function windDirection(currentWindDeg) {
  const windIcon = document.getElementById("wind-direction-icon");
  const windText = document.getElementById("wind-direction-text");

  const iconRotation = (currentWindDeg + 180) % 360;
  windIcon.style.transform = `rotate(${iconRotation}deg)`;

  const directions = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"];
  const normalizedDeg = (currentWindDeg + 360) % 360;

  const index = Math.round(normalizedDeg / 45) % 8;
  windText.textContent = directions[index] || "Н/Д";
}

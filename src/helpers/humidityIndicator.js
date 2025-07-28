export function humidityIndicator(humidity) {
  const parameter = document.querySelector(".parameter");

  parameter.style.width = `${humidity}%`;
  parameter.style.backgroundColor = "white";
}

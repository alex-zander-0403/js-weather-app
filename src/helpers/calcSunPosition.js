export function calcSunPosition(sunrise, sunset) {
  const now = Math.floor(Date.now() / 1000);
  const dayLength = sunset - sunrise;
  const elapsedTime = now - sunrise;

  const percent = elapsedTime / dayLength;
  return percent;
}

export function updateSunPosition(sunPosition) {
  const sunGraphic = document.querySelector(".sun-graphic circle");

  if (sunPosition < 0 || sunPosition > 1) {
    sunGraphic.setAttribute("visibility", "hidden");
    return;
  }

  sunGraphic.setAttribute("visibility", "visible");

  const startX = 20;
  const endX = 180;
  const horizonY = 35;
  const arcRadius = 45;

  const x = startX + sunPosition * (endX - startX);
  const y = horizonY - Math.sin(sunPosition * Math.PI) * arcRadius;

  sunGraphic.setAttribute("cx", x);
  sunGraphic.setAttribute("cy", y);
}

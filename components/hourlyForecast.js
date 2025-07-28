const hourlyForecastBlockEl = document.querySelector(".hourly-scroll");

export function renderHourlyForecast(data) {
  hourlyForecastBlockEl.innerHTML = "";

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

  const timeZone = data.city.timezone * 1000;

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000 + timeZone);
    const hour = date.getHours();
    const temp = Math.round(item.main.temp);
    const icon = item.weather[0].icon;

    const forecastDate = new Date(date);
    forecastDate.setHours(0, 0, 0, 0);

    const timeDiff = forecastDate.getTime() - currentDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let dayEl;
    if (dayDiff === 0) {
      dayEl = "сегодня";
    } else if (dayDiff === 1) {
      dayEl = "завтра";
    } else {
      dayEl = daysOfWeek[forecastDate.getDay()];
    }

    const hourlyItem = document.createElement("div");
    hourlyItem.classList.add("hourly-item");
    hourlyItem.innerHTML = `
        <p class="hour">${dayEl}</p>
        <p class="hour">${hour}:00</p>
        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="Погода"
        />
        <p class="temp">${temp} °C</p>`;
    hourlyForecastBlockEl.append(hourlyItem);
  });
}

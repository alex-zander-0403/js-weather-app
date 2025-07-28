const cityAbbreviation = {
  мск: "Москва",
  спб: "Санкт-Петербург",
  екб: "Екатеринбург",
  нсб: "Новосибирск",
};

export function cityCorrect(city) {
  const lowerCaseCity = city.toLowerCase();

  if (cityAbbreviation[lowerCaseCity]) {
    return cityAbbreviation[lowerCaseCity];
  }

  return lowerCaseCity;
}

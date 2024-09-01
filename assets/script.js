
const apiCountryURL = "https://flagcdn.com/16x12/br.png";


const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search-btn');
const cityElement = document.querySelector("#city-name");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#weather-description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country-flag");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind-speed span");
const weatherContainer = document.querySelector('#weather-data');
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");


const toggleLoader = () => {
  loader.classList.toggle("hidden");
};

// Função para obter dados do clima
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=c8e4f799b42d1ced29a84c15354116b6&units=metric&lang=pt_br`;
  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  toggleLoader();
  return data;
};


const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hidden");
};


const hideInformation = () => {
  errorMessageContainer.classList.add("hidden");
  weatherContainer.classList.add("hidden");
};


// Função para exibir os dados do clima
const showWeatherData = async (city) => {
  hideInformation();
  toggleLoader();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityElement.textContent = data.name;
  tempElement.textContent = parseInt(data.main.temp);
  descElement.textContent = data.weather[0].description;
  weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  countryElement.setAttribute("src", `https://flagcdn.com/16x12/${data.sys.country.toLowerCase()}.png`);
  humidityElement.textContent = `${data.main.humidity}%`;
  windElement.textContent = `${data.wind.speed} km/h`;


  weatherContainer.classList.remove('hidden');
};


searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) showWeatherData(city);
});

cityInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const city = e.target.value.trim();
    if (city) showWeatherData(city);
  }
});

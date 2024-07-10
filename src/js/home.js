import {
  createElement,
  fetchData,
  getLocation,
  formatTime,
  capitalize,
} from "./utils";

const catApiKey = process.env.CAT_API_KEY;
const dogApiKey = process.env.DOG_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

async function home() {
  try {
    const heroImage = createElement("img", {
      src: "https://raw.githubusercontent.com/fireburn553/dog-cat-and-weather/main/src/images/close-up-portrait-beautiful-cat.webp",
      alt: "Dog and Cat Hero Image",
      className: "hero-image",
    });
    const heroContainter = createElement(
      "div",
      { className: "hero-container" },
      [heroImage],
    );
    const position = await getLocation();
    const weatherData = await fetchData(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}&units=metric`,
    );
    const weatherElement = displayWeatherInfo(weatherData);

    const catData = await fetchData(
      "https://api.thecatapi.com/v1/images/search?limit=1",
      catApiKey,
    );
    const dogData = await fetchData(
      "https://api.thedogapi.com/v1/images/search?limit=1",
      dogApiKey,
    );

    const catElement = imageDiv(
      "Cat",
      catData,
      "cat-random-image",
      "Random Cat Image Today! Enjoy",
    );
    const dogElement = imageDiv(
      "Dog",
      dogData,
      "dog-random-image",
      "Random Dog Image Today! Enjoy",
    );

    const title = createElement("h2", { textContent: "HOME" });

    return createElement("div", {}, [
      heroContainter,
      title,
      catElement,
      dogElement,
      weatherElement,
    ]);
  } catch (error) {
    console.error("Error in home:", error);
    throw error;
  }
}

export function imageDiv(category, data, className, text) {
  const cardTitle = createElement("h3", {
    textContent: category,
  });
  const picture = createElement("img", {
    src: data[0].url,
    alt: data[0].id,
    className: className,
  });

  const label = createElement("p", {
    textContent: text,
  });

  return createElement("div", { className: "element-container" }, [
    cardTitle,
    picture,
    label,
  ]);
}

function displayWeatherInfo(weatherData) {
  const placeName = weatherData.name;
  const description = weatherData.weather[0].description;
  const sunrise = formatTime(weatherData.sys.sunrise);
  const sunset = formatTime(weatherData.sys.sunset);

  const cardTitle = createElement("h3", {
    textContent: "Weather Lookout",
  });

  const iconWeather = createElement("img", {
    src: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    alt: description + "icon",
    className: "icon-weather",
  });

  const weatherInfoElement = createElement("p", {
    textContent: `Temperature: ${weatherData.main.temp}°C`,
    className: "element",
  });

  const place = createElement("h4", {
    textContent: placeName.toUpperCase(),
  });
  const weatherDesc = createElement("p", {
    textContent: capitalize(description),
  });

  const sunRiseSet = createElement("p", {
    textContent: `Sunrise: ${sunrise} | Sunset: ${sunset}`,
  });

  return createElement("div", { className: "element-container" }, [
    cardTitle,
    place,
    iconWeather,
    weatherDesc,
    weatherInfoElement,
    sunRiseSet,
  ]);
}

export default home;

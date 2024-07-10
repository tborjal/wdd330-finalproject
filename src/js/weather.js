// weather.js
import { createElement, fetchData, getLocation } from "./utils";
const weatherApiKey = process.env.WEATHER_API_KEY;
async function weather() {
  const position = await getLocation();

  const weatherTitle = createElement("h2", { textContent: "WEATHER" });
  const weatherContainer = createElement("div", {
    className: "weather-container",
  });

  try {
    // Fetch weather data
    const weatherData = await fetchData(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely&units=metric&appid=${weatherApiKey}`,
    );

    // Current weather
    const currentWeather = weatherData.current;
    const currentWeatherElement = createElement(
      "div",
      { className: "current-weather" },
      [
        createElement("h3", { textContent: "Current Weather in your location" }),
        createElement("img", {
          src: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`,
          alt: "Weather Icon",
        }),
        createElement("p", {
          textContent: `Temperature: ${currentWeather.temp}°C`,
        }),
        createElement("p", {
          textContent: `Description: ${currentWeather.weather[0].description}`,
        }),
      ],
    );

    // Hourly weather
    const hourlyWeather = weatherData.hourly.slice(0, 5); // Display the next 5 hours
    const hourlyWeatherElements = hourlyWeather.map((hour) =>
      createElement("div", { className: "hourly-weather" }, [
        createElement("img", {
          src: `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`,
          alt: "Weather Icon",
        }),
        createElement("p", {
          textContent: `Time: ${new Date(hour.dt * 1000).toLocaleTimeString()}`,
        }),
        createElement("p", { textContent: `Temperature: ${hour.temp}°C` }),
        createElement("p", {
          textContent: `Description: ${hour.weather[0].description}`,
        }),
      ]),
    );
    const hourlyHeading = createElement("h3", {
      textContent: "Weather in the next 5 hours",
    });
    const hourlyWeatherDiv = createElement("div", { className: "hourly-div" }, [
      hourlyHeading,
      ...hourlyWeatherElements,
    ]);

    // Daily weather
    const dailyWeather = weatherData.daily.slice(0, 5); // Display the next 3 days
    const dailyWeatherElements = dailyWeather.map((day) =>
      createElement("div", { className: "daily-weather" }, [
        createElement("img", {
          src: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
          alt: "Weather Icon",
        }),
        createElement("p", {
          textContent: `Date: ${new Date(day.dt * 1000).toLocaleDateString()}`,
        }),
        createElement("p", {
          textContent: `Max Temperature: ${day.temp.max}°C`,
        }),
        createElement("p", {
          textContent: `Min Temperature: ${day.temp.min}°C`,
        }),
        createElement("p", {
          textContent: `Description: ${day.weather[0].description}`,
        }),
      ]),
    );
    const dailyHeading = createElement("h3", {
      textContent: "Weather in the next 5 days",
    });
    const dailyWeatherDiv = createElement("div", { className: "daily-div" }, [
      dailyHeading,
      ...dailyWeatherElements,
    ]);

    // Append all elements to the weather container
    weatherContainer.append(
      currentWeatherElement,
      hourlyWeatherDiv,
      dailyWeatherDiv,
    );
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }

  return createElement("div", { className: "container" }, [
    weatherTitle,
    weatherContainer,
  ]);
}

export default weather;

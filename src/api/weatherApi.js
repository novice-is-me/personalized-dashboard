import { fetchWeatherApi } from "openmeteo";

export async function getWeatherData() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const params = {
          latitude,
          longitude,
          current: [
            "temperature_2m",
            "precipitation",
            "wind_speed_10m",
            "cloud_cover",
          ],
        };

        console.log("location coords:", latitude, longitude);

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();

        const current = response.current();

        console.log("Current Weather Data:", current);

        if (!current) {
          throw new Error("No current weather data available.");
        }

        const weatherData = {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature: current.variables(0).value(),
          precipitation: current.variables(1).value(),
          windSpeed: current.variables(2).value(),
          cloudCover: current.variables(3).value(),
        };

        resolve(weatherData);
      } catch (error) {
        reject(error);
      }
    }, reject);
  });
}

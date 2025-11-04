import { getWeatherData } from "@/api/weatherApi";
import {
  CloudHail,
  CloudMoon,
  CloudSun,
  Cloudy,
  Sun,
  Wind,
} from "lucide-react";
import React, { Suspense, use, useEffect, useState } from "react";

// Instead of fetching data inside the use(), we create a promise here outside
let weatherPromise = null; // It doesnt create yet

const getWeatherPromise = () => {
  if (!weatherPromise) {
    weatherPromise = getWeatherData(); // fetch the getWeatherData once
  }
  return weatherPromise;
};

const WeatherContent = () => {
  const [cloudIcon, setCloudIcon] = useState(null);

  const weatherData = use(getWeatherPromise()); // This is like async/await but for components

  const wholeTemp = Math.round(weatherData.temperature);
  const windSpeed = Math.round(weatherData.windSpeed);
  const cloudCover = Math.round(weatherData.cloudCover);
  const city = weatherData.location.city;
  const country = weatherData.location.country.replace(" (the)", "");

  useEffect(() => {
    const hour = weatherData.time.getHours();

    if (cloudCover <= 10) {
      setCloudIcon(<Sun size={30} />);
    } else if (cloudCover > 10 && cloudCover <= 50) {
      if (hour < 12) {
        setCloudIcon(<CloudSun size={30} />);
      } else {
        setCloudIcon(<CloudMoon size={30} />);
      }
    } else {
      setCloudIcon(<Cloudy size={30} />);
    }
  }, []);

  return (
    <div className="card border">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl">Weather</p>
            <p className="text-sm">
              {city} city, {country}
            </p>
          </div>
          <div>{cloudIcon}</div>
        </div>
        <div className="border-b pb-4">
          <h1>{wholeTemp}°</h1>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <CloudHail />
            <p>{weatherData.precipitation}</p>
          </div>
          <div className="flex gap-2">
            <Wind />
            <p>{windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Weather = () => {
  return (
    <Suspense
      fallback={
        <div className="card border">
          <p className=" text-xl">Loading weather...</p>
        </div>
      }
    >
      <WeatherContent />
    </Suspense>
  );
};

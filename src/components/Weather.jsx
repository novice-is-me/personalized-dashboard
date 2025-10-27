import { CloudHail, CloudRainWind, Wind } from "lucide-react";
import React from "react";

export const Weather = () => {
  return (
    <div className=" card border">
      <div className=" space-y-6">
        <div className=" flex justify-between items-center">
          <div>
            <p className=" text-xl">Weather</p>
            <p className=" text-sm">Your city</p>
          </div>
          <div>
            <CloudRainWind size={30} />
          </div>
        </div>
        <div className=" border-b pb-4">
          <h1>64°</h1>
          <p>Rainy</p>
        </div>
        <div className=" flex gap-4">
          <div className=" flex gap-2">
            <CloudHail />
            <p>65%</p>
          </div>
          <div className=" flex gap-2">
            <Wind />
            <p>12 km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

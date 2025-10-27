import { Moon, Sun } from "lucide-react";
import React from "react";

export const TimeGreet = () => {
  return (
    <div className="card border text-center space-y-2">
      <div>
        <Sun size={50} className="animate-float" />
        <Moon size={50} className="animate-float" />
      </div>
      <div className=" space-y-2">
        <h1 className=" text-6xl">1:37 pm</h1>
        <p>Good Afternoon, Friend</p>
        <p>Monday. October 27, 2025</p>
      </div>
    </div>
  );
};

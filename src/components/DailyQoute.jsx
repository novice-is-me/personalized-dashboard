import { Quote, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

export const DailyQoute = () => {
  const [isRotating, setIsRotating] = useState(false);
  const retryMove = () => {
    setIsRotating(true);
    console.log("after", isRotating);

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };
  return (
    <div className=" card border">
      <div className=" space-y-6">
        <div className=" flex justify-between items-center">
          <div className=" flex gap-2 items-center">
            <Quote />
            <p className=" text-xl">Daily Qoute</p>
          </div>
          <RefreshCcw
            className={`hover:cursor-pointer transform transition-transform duration-1000 ${
              isRotating ? "rotate-[360deg]" : ""
            }`}
            onClick={retryMove}
          />
        </div>
        <div className=" space-y-4">
          <p className=" text-[18px] font-bold">
            "Innovation distinguishes between a leader and a follower."
          </p>
          <p> — Steve jobs</p>
        </div>
      </div>
    </div>
  );
};

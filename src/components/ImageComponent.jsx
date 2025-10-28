import { Image, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

export const ImageComponent = () => {
  const [isRotating, setIsRotating] = useState(false);

  const retryMove = () => {
    setIsRotating(true);
    console.log("after", isRotating);

    // Reset rotation after animation duration
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };
  return (
    <div className=" card border">
      <div className=" space-y-6">
        <div className=" flex justify-between items-center">
          <div className=" flex gap-2 items-center">
            <Image />
            <p className=" text-xl">Image of the Day</p>
          </div>
          <RefreshCcw
            className={`hover:cursor-pointer transform transition-transform duration-1000 ${
              isRotating ? "rotate-[360deg]" : ""
            }`}
            onClick={retryMove}
          />
        </div>
        <div className=" space-y-4">
          <p className=" text-[18px] font-bold">Image</p>
          <p> — Steve jobs</p>
        </div>
      </div>
    </div>
  );
};

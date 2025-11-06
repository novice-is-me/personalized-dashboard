import { getRandomImage } from "@/api/imageApi";
import { Image, RefreshCcw } from "lucide-react";
import React, { Suspense, use, useEffect, useState } from "react";

let imagePromise = null; // It doesnt create yet

const getImagePromise = () => {
  if (!imagePromise) {
    imagePromise = getRandomImage(); // fetch the getImageData once
  }
  return imagePromise;
};

const ImageContent = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [image, setImage] = useState(null);
  const data = use(getImagePromise());

  useEffect(() => {
    setImage(data);
  }, []);

  const retryMove = () => {
    imagePromise = getRandomImage();
    setIsRotating(true);

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };
  return (
    <div className=" card border max-h-[500px]">
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
          {image ? (
            <img
              src={image}
              alt="Random from API Ninjas"
              className="rounded-4xl border w-full max-h-[300px] object-cover"
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const ImageComponent = () => {
  return (
    <Suspense
      fallback={
        <div className="card border">
          <p className=" text-xl">Loading image...</p>
        </div>
      }
    >
      <ImageContent />
    </Suspense>
  );
};

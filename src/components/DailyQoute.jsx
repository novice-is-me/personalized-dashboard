import { getQoutesData } from "@/api/QoutesApi";
import { Quote, RefreshCcw } from "lucide-react";
import React, { Suspense, use, useEffect, useState } from "react";

let quotePromise = null; // It doesnt create yet

const getQuotePromise = () => {
  if (!quotePromise) {
    quotePromise = getQoutesData(); // fetch the getQoutesData once
  }
  return quotePromise;
};

const QoutesContent = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const data = use(getQuotePromise()); // This is like async/await but for components

  useEffect(() => {
    setQuoteData(data);
  }, []);

  const retryMove = () => {
    quotePromise = getQoutesData(); // reset the promise to fetch new data
    setIsRotating(true);

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
            {quoteData ? `"${quoteData.quote}"` : "Loading..."}
          </p>
          <p> — {quoteData ? `"${quoteData.author}"` : "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export const DailyQoute = () => {
  return (
    <Suspense
      fallback={
        <div className="card border">
          <p className=" text-xl">Loading qoutes...</p>
        </div>
      }
    >
      <QoutesContent />
    </Suspense>
  );
};

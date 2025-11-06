import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

export const TimeGreet = () => {
  const [time, setTime] = useState("");
  const [dateToday, setDateToday] = useState("");
  const [timeSuffix, setTimeSuffix] = useState("");
  const [timeIcon, setTimeIcon] = useState(null);

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    const timeToday = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const dateToday = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setDateToday(dateToday);
    setTime(timeToday);

    if (hour < 12) {
      setTimeSuffix("Good Morning");
      setTimeIcon(<Sun size={50} className="animate-float" />);
    } else if (hour >= 12 && hour < 18) {
      setTimeSuffix("Good Afternoon");
      setTimeIcon(<Sun size={50} className="animate-float" />);
    } else {
      setTimeSuffix("Good Evening");
      setTimeIcon(<Moon size={50} className="animate-float" />);
    }
  }, []);

  return (
    <div className="card border text-center flex flex-col items-center ">
      <div>{timeIcon}</div>
      <div className=" space-y-2">
        <h1 className=" text-6xl">{time}</h1>
        <p>{timeSuffix}, Friend!</p>
        <p>{dateToday}</p>
      </div>
    </div>
  );
};

import { ThemeContext } from "@/contexts/ThemeContext";
import { ArrowLeft, Palette } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

export const Settings = () => {
  // Create a state to hold the active theme
  const { setTheme } = useContext(ThemeContext);

  // Create an array of available themes
  const availTheme = [
    {
      name: "violet",
      circle1: "bg-[#212529]",
      circle2: "bg-[#9f86c0]",
      circle3: "bg-[#2c243e]",
    },
    {
      name: "pastel",
      circle1: "bg-[#e9f5db]",
      circle2: "bg-[#718355]",
      circle3: "bg-[#f0f8e8]",
    },
    {
      name: "rainbow",
      circle1: "bg-[#47126b]",
      circle2: "bg-[#ea698b]",
      circle3: "bg-[#5e2a8c]",
    },
    {
      name: "ocean",
      circle1: "bg-[#00b4d8]",
      circle2: "bg-[#03045e]",
      circle3: "bg-[#90e0ef]",
    },
    {
      name: "light",
      circle1: "bg-[#f0efe9]",
      circle2: "bg-[#1a1a1a]",
      circle3: "bg-[#ffffff]",
    },
  ];

  return (
    <div>
      <div className="flex gap-x-2 items-center">
        <Link to="/">
          <ArrowLeft className="cursor-pointer" />
        </Link>
        <h1>Board Settings</h1>
      </div>
      {/* Personalization */}
      <div className=" space-y-4">
        <div className=" flex gap-x-2 pt-2">
          <Palette />
          <p className=" text-lg">Theme</p>
        </div>

        {/* Themes */}
        <div className=" space-y-4">
          {availTheme.map((theme) => {
            return (
              <div key={theme.name}>
                <div
                  className="flex gap-x-2 border p-4 cursor-pointer rounded-full"
                  onClick={() => setTheme(theme.name)}
                >
                  <div
                    className={`${theme.circle1} w-6 h-6 rounded-full `}
                  ></div>
                  <div
                    className={`${theme.circle2} w-6 h-6 rounded-full`}
                  ></div>
                  <div
                    className={`${theme.circle3} w-6 h-6 rounded-full`}
                  ></div>
                  <p className=" capitalize">{theme.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

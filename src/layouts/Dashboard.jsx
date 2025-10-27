import React, { useContext } from "react";
import { Sun, Moon, Settings } from "lucide-react";
import { ThemeContext } from "@/contexts/ThemeContext";

const Dashboard = () => {
  // destructure the params in the themeContext file using the {} syntax
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className=" flex justify-between py-4">
      <div>
        <h1 className="text-gradient">DashFlow</h1>
        <p>Your personal dashboard</p>
      </div>
      <div className=" flex justify-between items-center gap-4">
        <div
          className="rounded-full border p-2 hover:cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? <Sun /> : <Moon />}
        </div>
        <div className="rounded-full border p-2 hover:cursor-pointer">
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

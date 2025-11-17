import React, { useContext } from "react";
import { Sun, Moon, Settings } from "lucide-react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // destructure the params in the themeContext file using the {} syntax
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className=" flex justify-between py-8">
      <div>
        <h1 className="text-gradient">DashFlow</h1>
        <p>Your personal dashboard</p>
      </div>
      <div className=" flex justify-between items-center gap-4">
        <div
          className="rounded-full border p-2 hover:cursor-pointer"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Sun /> : <Moon />}
        </div>
        <div className="rounded-full border p-2 hover:cursor-pointer">
          <Link to="/settings">
            <Settings />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

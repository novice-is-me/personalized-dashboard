import "./App.css";
import { TimeGreet } from "./components/TimeGreet";
import { Weather } from "./components/Weather";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./layouts/Dashboard";

function App() {
  return (
    <div className="body-style space-y-6">
      <ThemeProvider>
        <Dashboard />
        <div className=" space-y-6">
          <div className="w-full">
            <TimeGreet />
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-3">
            <Weather />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;

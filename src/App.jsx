import "./App.css";
import { TimeGreet } from "./components/TimeGreet";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./layouts/Dashboard";

function App() {
  return (
    <div className="body-style space-y-6">
      <ThemeProvider>
        <Dashboard />
        <div>
          <div className="w-full">
            <TimeGreet />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;

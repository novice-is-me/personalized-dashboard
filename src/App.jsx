import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./layouts/Dashboard";

function App() {
  return (
    <div className="body-style">
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </div>
  );
}

export default App;

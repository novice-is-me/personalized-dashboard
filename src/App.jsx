import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./layouts/Dashboard";
import { Route, Routes } from "react-router-dom";
import Main from "./page/Home";
import { Settings } from "./page/Settings";

function App() {
  return (
    <div className="body-style space-y-6 overflow-hidden">
      <ThemeProvider>
        <Dashboard />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;

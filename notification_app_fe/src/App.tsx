import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { initializeAuth } from "./utils/auth";

function App() {
  useEffect(() => {
    // Initialize authentication on app load
    initializeAuth();
  }, []);

  return <Dashboard />;
}

export default App;

import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Region } from "./pages";
import { DaemonProvider } from "./providers/DaemonProvider";
import { initializeWorkerService } from "./services/workerService";

function App() {
  useEffect(() => {
    initializeWorkerService();
  }, []);

  return (
    <div className="App">
      <DaemonProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/regions" element={<Region />}></Route>
          </Routes>
        </Router>
      </DaemonProvider>
    </div>
  );
}

export default App;

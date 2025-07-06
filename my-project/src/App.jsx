import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EventManagement from "./assets/components/pages/EventManagement";
import Auth from "./assets/components/pages/Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function App() {
  function AppWrapper() {
    return (
      <>
        <Routes>
          <Route path="/" element={<EventManagement />} />
          <Route path="/login" element={<Auth/>}/>
        </Routes>
        ;
      </>
    );
  }
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

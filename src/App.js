import React from "react";
import "./App.css";
import {Home} from "./pages/Home";
import {Source} from "./pages/Source";
import {About} from "./pages/About";
import {Developer} from "./pages/Developer";
import {Nav} from "./pages/Nav";
import {Foot} from "./pages/Foot"


import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App = () => {
  return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact element ={<Home />} />
          <Route path="/source-code" element={<Source />} />
          <Route path="/about" element={<About />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Foot/>
      </div>
  );
}

export default App;

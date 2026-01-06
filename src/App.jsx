import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

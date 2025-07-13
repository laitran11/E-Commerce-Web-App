import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Product from "./pages/Product";
import {ThemeProvider} from "./ThemeContext";
import './App.css';
function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App

// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonListPage from "./pages/PokemonListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<PokemonListPage />} />
      </Routes>
    </Router>
  );
}

export default App;

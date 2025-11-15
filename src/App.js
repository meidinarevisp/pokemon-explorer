import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonListPage from "./pages/PokemonListPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<PokemonListPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

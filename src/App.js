import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonListPage from "./pages/PokemonListPage";

function App() {
  return (
    <BrowserRouter basename="/pokemon-explorer">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<PokemonListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

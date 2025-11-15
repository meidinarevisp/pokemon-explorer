import { useState, useEffect } from "react";
import { FaFire, FaSyncAlt } from "react-icons/fa";
import PokemonCard from "./PokemonCard";
import PokemonDetail from "./PokemonDetail";
import {
  fetchAllPokemons,
  fetchPokemonTypes,
  fetchPokemonsByType,
} from "../utils/api";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("asc");
  const [visibleCount, setVisibleCount] = useState(12);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    loadData();
    const closeModal = () => setSelectedPokemon(null);
    window.addEventListener("closePokemonModal", closeModal);
    return () => window.removeEventListener("closePokemonModal", closeModal);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pokemonData, typeData] = await Promise.all([
        fetchAllPokemons(),
        fetchPokemonTypes(),
      ]);
      setPokemons(pokemonData.results);
      setTypes(typeData.results);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setSelectedType("all");
    setOrder("asc");
    setVisibleCount(12);
    await loadData();
    setTimeout(() => setRefreshing(false), 700);
  };

  const filterByType = async (type) => {
    setSelectedType(type);
    setLoading(true);
    try {
      if (type === "all") {
        const data = await fetchAllPokemons();
        setPokemons(data.results);
      } else {
        const data = await fetchPokemonsByType(type);
        const pokemonsByType = data.pokemon.map((p) => p.pokemon);
        setPokemons(pokemonsByType);
      }
    } catch (err) {
      console.error("Error filtering Pokémon:", err);
    } finally {
      setLoading(false);
    }
  };

  const sortedPokemons = [...pokemons].sort((a, b) => {
    const idA = Number(a.url.split("/").slice(-2)[0]);
    const idB = Number(b.url.split("/").slice(-2)[0]);
    return order === "asc" ? idA - idB : idB - idA;
  });

  const displayedPokemons = sortedPokemons.slice(0, visibleCount);

  const handleSeeMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setLoadingMore(false);
    }, 600);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-8 animate-fadeIn">
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-xs md:text-sm font-mono text-white tracking-wider cursor-pointer focus:outline-none focus:border-white/60 transition"
        >
          <option value="asc" className="bg-gray-900">
            ASC
          </option>
          <option value="desc" className="bg-gray-900">
            DESC
          </option>
        </select>

        <div className="flex items-center gap-2">
          <FaFire className="text-white/70 text-sm" />
          <select
            value={selectedType}
            onChange={(e) => filterByType(e.target.value)}
            className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-xs md:text-sm font-mono text-white tracking-wider cursor-pointer focus:outline-none focus:border-white/60 transition"
          >
            <option value="all" className="bg-gray-900">
              ALL TYPES
            </option>
            {types.map((type) => (
              <option key={type.name} value={type.name} className="bg-gray-900">
                {type.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2.5 rounded-full bg-white/20 border border-white/30 transition-all hover:bg-white/30 disabled:opacity-50"
        >
          <FaSyncAlt
            className={`text-white text-sm ${refreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      <p className="text-center text-white/70 font-mono text-xs md:text-sm tracking-widest mb-8">
        SHOWING{" "}
        <span className="text-white font-bold">{displayedPokemons.length}</span>{" "}
        OF <span className="text-white font-bold">{pokemons.length}</span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {displayedPokemons.map((pokemon, index) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            index={index}
            onClick={() => setSelectedPokemon(pokemon.name)}
          />
        ))}
      </div>

      {pokemons.length > visibleCount && (
        <div className="flex justify-center mt-12 animate-fadeInUp">
          {loadingMore ? (
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              onClick={handleSeeMore}
              className="group relative bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold tracking-widest text-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>

              {/* Text */}
              <span className="relative z-10 flex items-center gap-3">
                <span>SEE MORE</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
      )}

      {selectedPokemon && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-start pt-8 md:pt-16 z-50 overflow-y-auto backdrop-blur-md"
          onClick={() => setSelectedPokemon(null)}
        >
          <div
            className="w-full max-w-5xl mx-4 mb-12"
            onClick={(e) => e.stopPropagation()}
          >
            <PokemonDetail name={selectedPokemon} />
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonList;

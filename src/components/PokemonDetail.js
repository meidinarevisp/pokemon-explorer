import { useState, useEffect } from "react";
import { fetchPokemonDetail } from "../utils/api";

function PokemonDetail({ name }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const data = await fetchPokemonDetail(name);
        setPokemon(data);
      } catch (err) {
        console.error("Error fetching Pokémon detail:", err);
      }
    };
    getPokemon();
  }, [name]);

  if (!pokemon) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const typeColors = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-300",
    fighting: "bg-red-600",
    poison: "bg-purple-600",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-700",
    ghost: "bg-purple-700",
    dragon: "bg-purple-800",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  };

  const mainType = pokemon.types[0].type.name;
  const typeColor = typeColors[mainType] || "bg-gray-400";

  return (
    <div className="p-4 md:p-6 animate-fadeIn">
      <div className="bg-black/90 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-white/30 max-w-5xl mx-auto shadow-2xl">
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <button
            onClick={() => window.dispatchEvent(new Event("closePokemonModal"))}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110 z-20 group"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl"></div>
              <img
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="w-full h-full object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
              <div>
                <p className="text-sm md:text-base font-mono text-white/60 mb-2">
                  #{pokemon.id.toString().padStart(4, "0")}
                </p>
                <h1 className="text-4xl md:text-6xl font-black capitalize text-white tracking-tight">
                  {pokemon.name}
                </h1>
              </div>

              <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`${
                      typeColors[t.type.name]
                    } text-white px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 md:gap-6 justify-center md:justify-start pt-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                  <p className="text-xs text-white/60 font-mono mb-1">Height</p>
                  <p className="text-xl font-black text-white">
                    {(pokemon.height / 10).toFixed(1)}m
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                  <p className="text-xs text-white/60 font-mono mb-1">Weight</p>
                  <p className="text-xl font-black text-white">
                    {(pokemon.weight / 10).toFixed(1)}kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
              <span className="w-1 h-8 bg-white rounded-full"></span>
              Base Stats
            </h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-5 border border-white/10">
              {pokemon.stats.map((stat) => {
                const statNames = {
                  hp: "HP",
                  attack: "ATK",
                  defense: "DEF",
                  "special-attack": "SP.ATK",
                  "special-defense": "SP.DEF",
                  speed: "SPD",
                };
                const percentage = (stat.base_stat / 255) * 100;
                return (
                  <div key={stat.stat.name}>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="w-20 text-xs font-bold text-white/70 uppercase tracking-wider">
                        {statNames[stat.stat.name]}
                      </span>
                      <span className="w-12 font-black text-white text-sm text-center">
                        {stat.base_stat}
                      </span>
                      <div className="flex-1 bg-white/10 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`${typeColor} h-full rounded-full transition-all duration-700`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pt-5 border-t border-white/20 flex justify-between items-center">
                <span className="text-sm font-bold text-white/70 uppercase tracking-wider">
                  Total
                </span>
                <span className="text-2xl font-black text-white">
                  {pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
              <span className="w-1 h-8 bg-white rounded-full"></span>
              Abilities
            </h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-3 border border-white/10">
              {pokemon.abilities.map((ability, idx) => (
                <div
                  key={ability.ability.name}
                  className={`flex items-center gap-4 p-4 bg-white/5 rounded-xl border ${
                    ability.is_hidden
                      ? "border-dashed border-white/30"
                      : "border-white/10"
                  } hover:bg-white/10 transition-all duration-300`}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sm font-black text-white border border-white/20">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold capitalize text-white text-sm md:text-base">
                      {ability.ability.name.replace("-", " ")}
                    </p>
                    {ability.is_hidden && (
                      <p className="text-xs text-white/50 font-mono mt-1">
                        Hidden Ability
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;

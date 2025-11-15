import { useState } from "react";

function PokemonCard({ pokemon, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const pokemonId = pokemon.url.split("/")[6];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center
        border-2 border-white/20 cursor-pointer transition-all duration-300
        ${
          isHovered
            ? "border-white/60 shadow-2xl -translate-y-2 bg-white/20"
            : "shadow-lg bg-white/5"
        }
        animate-fadeInUp
      `}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <p className="text-left text-xs font-mono text-white/60 tracking-widest">
        #{pokemonId.padStart(3, "0")}
      </p>

      <div className="bg-white/20 rounded-xl p-4 mb-3 border border-white/30">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt={pokemon.name}
          className={`
            w-full h-28 md:h-32 object-contain transition-transform duration-300
            ${isHovered ? "scale-115 drop-shadow-glow" : "drop-shadow-md"}
          `}
        />
      </div>

      <h3 className="text-white font-bold text-sm md:text-base tracking-tight uppercase font-mono">
        {pokemon.name}
      </h3>

      {isHovered && (
        <div className="absolute inset-0 rounded-2xl border-2 border-white/70 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
}

export default PokemonCard;

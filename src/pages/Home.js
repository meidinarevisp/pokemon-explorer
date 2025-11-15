import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllPokemons } from "../utils/api";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchAllPokemons();
        const shuffled = data.results.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 12);
        setPokemons(selected);
      } catch (err) {
        console.error("Error loading Pokémon:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPokemons();
  }, []);

  const formatName = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className="fixed inset-0 overflow-hidden bg-black text-white">
      <div className="grain-overlay animate-grain"></div>
      <div className="vignette"></div>
      <div className="scanline"></div>
      <div className="absolute inset-0 stripes-bg opacity-50"></div>
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-white"></div>

        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-white"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-white"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-white"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-white"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              top: `${10 + i * 10}%`,
              left: `${5 + i * 11}%`,
              transform: `rotate(${i * 15}deg)`,
              animation: `float ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-full justify-center items-center">
        {/* Header - Centered */}
        <header className="px-6 md:px-8 py-8 md:py-12">
          <div className="text-center space-y-4 md:space-y-6 animate-fadeInUp">
            <div className="relative">
              <h1
                className="title-retro text-5xl sm:text-6xl md:text-9xl font-black tracking-tighter text-white text-shadow-glow"
                data-text="POKÉMON"
              >
                POKÉMON
              </h1>
              <div className="absolute inset-0 border-4 border-white/10 -z-10 transform translate-x-2 translate-y-2"></div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300 tracking-wide">
              EXPLORER
            </h2>

            <div className="flex items-center justify-center gap-4 mt-4 md:mt-6">
              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-white"></div>
              <div className="w-2 h-2 bg-white rotate-45"></div>
              <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-white"></div>
            </div>

            <p className="mt-4 md:mt-6 text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed font-light tracking-wide px-4">
              Browse through a diverse collection of Pokémon
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              and explore their types, abilities, and traits.
            </p>
          </div>
        </header>

        {/* Marquee - Centered */}
        <div className="relative w-full h-40 sm:h-48 md:h-72 bg-gradient-to-b from-transparent via-white/5 to-transparent border-y border-white/10 flex items-center overflow-hidden backdrop-blur-sm my-6 md:my-0">
          <div className="flex animate-marquee gap-4 sm:gap-6 md:gap-8 items-center px-4">
            {[...pokemons, ...pokemons, ...pokemons].map((pokemon, index) => {
              const id = pokemon.url.split("/").slice(-2, -1)[0];

              return (
                <div
                  key={`${pokemon.name}-${index}`}
                  className="pokemon-card flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border-2 border-white/20 p-3 sm:p-4 flex flex-col items-center justify-center backdrop-blur-sm border-glow"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt={pokemon.name}
                    className="pokemon-img w-full h-full object-contain drop-shadow-2xl"
                    loading="lazy"
                  />

                  <div className="absolute bottom-1 sm:bottom-2 text-[8px] sm:text-[10px] font-mono text-white/60 tracking-widest uppercase">
                    {formatName(pokemon.name)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Button - Centered */}
        <div className="mt-8 md:mt-0 md:absolute md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-3 group">
          <Link to="/list">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 group-hover:scale-110 transition-transform duration-500">
              <svg
                className="absolute inset-0 w-full h-full animate-rotate"
                viewBox="0 0 160 160"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 80, 80 m -65, 0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0"
                  />
                </defs>
                <text
                  fill="white"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="3"
                  fontFamily="monospace"
                >
                  <textPath href="#circlePath" startOffset="0%">
                    ◆ EXPLORE · DISCOVER · COLLECT · ENJOY ◆
                  </textPath>
                </text>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-white/30 rounded-full animate-borderGlow"></div>

                  <div className="relative bg-white text-black w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-900 hover:text-white transition-all duration-300 border-4 border-white/20">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-current"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="text-center">
            <p className="text-[10px] sm:text-xs font-mono text-white/80 tracking-widest animate-pulse">
              START EXPLORING
            </p>
            <div className="flex gap-1 justify-center mt-1">
              <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
              <div
                className="w-1 h-1 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-1 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-white border-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-sm font-mono text-white/60 tracking-widest animate-pulse">
              LOADING...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

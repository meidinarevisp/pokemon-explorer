import { Link } from "react-router-dom";
import PokemonList from "../components/PokemonList";
import { FaHome, FaArrowUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

function PokemonListPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowBackToTop(container.scrollTop > 600);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="grain-overlay animate-grain"></div>
        <div className="vignette-soft"></div>
        <div className="scanline-soft"></div>
        <div className="absolute inset-0 stripes-bg opacity-30"></div>

        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-0 w-full h-px bg-white"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-white"></div>
          <div className="absolute top-0 left-0 w-px h-full bg-white"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-white"></div>

          <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 border-t-2 border-l-2 border-white"></div>
          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 border-t-2 border-r-2 border-white"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 border-b-2 border-l-2 border-white"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 border-b-2 border-r-2 border-white"></div>
        </div>

        <div className="absolute inset-0 opacity-15">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-white/40"
              style={{
                width: `${50 + i * 15}px`,
                height: `${50 + i * 15}px`,
                top: `${15 + i * 12}%`,
                left: `${8 + i * 13}%`,
                transform: `rotate(${i * 20}deg)`,
                animation: `float ${4 + i * 0.8}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative z-10 h-full overflow-y-auto overflow-x-hidden"
        style={{
          paddingRight: "0px",
          marginRight: "0px",
        }}
      >
        <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto pr-4 md:pr-8">
          <header className="text-center mb-10 animate-fadeInUp">
            <h1
              className="title-retro text-5xl md:text-7xl font-black tracking-tighter text-white text-shadow-glow"
              data-text="ALL POKÉMON"
            >
              ALL POKÉMON
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-300 font-light tracking-wide">
              Find all the Pokémon you love and uncover their unique powers!
            </p>
          </header>

          <PokemonList />
        </div>
      </div>

      <Link
        to="/"
        className="fixed top-6 left-6 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg group"
      >
        <FaHome className="text-lg group-hover:scale-110 transition-transform" />
      </Link>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white transition-all duration-500 shadow-lg group
          ${
            showBackToTop
              ? "translate-y-0 opacity-100"
              : "translate-y-16 opacity-0 pointer-events-none"
          }
        `}
      >
        <FaArrowUp className="text-lg group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

export default PokemonListPage;

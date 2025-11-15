const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchAllPokemons(limit = 200) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json();
}

export async function fetchPokemonTypes() {
  const res = await fetch(`${BASE_URL}/type`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon types");
  return res.json();
}

export async function fetchPokemonsByType(type) {
  const res = await fetch(`${BASE_URL}/type/${type}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon type: ${type}`);
  return res.json();
}

export async function fetchPokemonDetail(name) {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon: ${name}`);
  return res.json();
}

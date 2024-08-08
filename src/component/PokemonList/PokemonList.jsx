import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
import { useEffect } from 'react';

function PokemonList() {
    const [pokemonListState, setPokemonListState] = usePokemonList(false);

    useEffect(() => {
        console.log("render")
    });

    return (
        <div className="flex flex-col items-center p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pokemonListState.isLoading ? 'Loading....' : 
                    pokemonListState.pokemonList.map((p) => (
                        <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                    ))
                }
            </div>
            <div className="flex space-x-4 mt-4">
                <button
                    disabled={pokemonListState.prevUrl == null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={() => {
                        const urlToSet = pokemonListState.prevUrl;
                        setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
                    }}
                >
                    Prev
                </button>
                <button
                    disabled={pokemonListState.nextUrl == null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={() => {
                        console.log(pokemonListState);
                        const urlToSet = pokemonListState.nextUrl;
                        setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;

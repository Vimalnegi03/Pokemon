import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

function Pokedex() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className=" flex flex-col items-center p-4 bg-gray-900 min-h-screen">
            <Search updateSearchTerm={setSearchTerm} />
            <div className="w-full">
                { (!searchTerm) ? 
                    <PokemonList /> : 
                    <PokemonDetails key={searchTerm} pokemonName={searchTerm} />
                }
            </div>
        </div>
    )
}

export default Pokedex;

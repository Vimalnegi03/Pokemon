import { useParams } from "react-router-dom";
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails({ pokemonName }) {
    const { id } = useParams();
    const [pokemon] = usePokemonDetails(id, pokemonName);

    return (
        <div className="flex flex-col items-center p-4 bg-gray-800 text-white">
            <img className="w-48 h-48 object-contain mb-4" src={pokemon.image} alt={pokemon.name} />
            <div className="text-2xl font-bold mb-2">{pokemon.name}</div>
            <div className="text-lg mb-2">Height: {pokemon.height}</div>
            <div className="text-lg mb-4">Weight: {pokemon.weight}</div>
            <div className="flex flex-wrap justify-center mb-4">
                {pokemon.types && pokemon.types.map((t) => (
                    <div key={t} className="bg-blue-500 rounded-full px-3 py-1 m-1">{t}</div>
                ))}
            </div>
            {pokemon.types && pokemon.similarPokemons && (
                <div className="w-full text-center">
                    <div className="text-xl mb-2">More {pokemon.types[0]} type pokemons:</div>
                    <ul className="list-disc list-inside">
                        {pokemon.similarPokemons.map((p) => (
                            <li key={p.pokemon.url} className="text-lg">{p.pokemon.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PokemonDetails;

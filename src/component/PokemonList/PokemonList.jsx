import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./PokemonList.css";
import Pokemon from '../Pokemon/Pokemon';

export default function PokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        loading: true,
        prevUrl: "",
        nextUrl: "",
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon'
    });

    async function downloadPokemons() {
        setPokemonListState(prevState => ({ ...prevState, loading: true }));

        try {
            const response = await axios.get(pokemonListState.pokedexUrl);
            const PokemonResults = response.data.results;

            const PokemonResultPromise = PokemonResults.map((pokemon) =>
                axios.get(pokemon.url)
            );

            const pokemonData = await Promise.all(PokemonResultPromise);
            const res = pokemonData.map((pokeData) => {
                const Pokemon = pokeData.data;
                return {
                    id: Pokemon.id,
                    name: Pokemon.name,
                    image: Pokemon.sprites.other ? Pokemon.sprites.other.dream_world.front_default : Pokemon.sprites.front_shiny,
                    types: Pokemon.types.map(type => type.type.name)
                };
            });

            setPokemonListState(prevState => ({
                ...prevState,
                pokemonList: res,
                nextUrl: response.data.next,
                prevUrl: response.data.previous,
                loading: false
            }));
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
            setPokemonListState(prevState => ({ ...prevState, loading: false }));
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    const { loading, pokemonList, prevUrl, nextUrl } = pokemonListState;

    return (
        <div className='pokemon-list-wrapper'>
            <div className='pokemon-wrapper'>
                {loading ? "Loading...." : pokemonList.map((poke) => (
                    <Pokemon name={poke.name} image={poke.image} types={poke.types} key={poke.id} id={poke.id} />
                ))}
            </div>
            <div className='controls'>
                <button disabled={!prevUrl} onClick={() => setPokemonListState(prevState => ({ ...prevState, pokedexUrl: prevUrl }))}>Prev</button>
                <button disabled={!nextUrl} onClick={() => setPokemonListState(prevState => ({ ...prevState, pokedexUrl: nextUrl }))}>Next</button>
            </div>
        </div>
    );
}

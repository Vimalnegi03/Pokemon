import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.css'
function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function downloadPokemon() {
        try {
            setLoading(true);
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name),
            });
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading Pokémon data.</div>;

    return (
        <div className='pokemon-details-wrapper'>
           <img className='pokemon-img' src={pokemon.image} alt={pokemon.name} />
            <div className='pokemon-name'> <span>{pokemon.name}</span></div>
            <div className='pokemon-name'>Height: {pokemon.height}</div>
            <div className='pokemon-name'>Weight: {pokemon.weight}</div>
            <div className='pokemon-types'>{pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}</div>
        </div>
    );
}

export default PokemonDetails;

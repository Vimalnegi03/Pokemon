import React,{useEffect,useState} from 'react'
import axios from 'axios'
import "./PokemonList.css"
import Pokemon from '../Pokemon/Pokemon';
export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    async function downloadPokemons()
    {
        const response=await axios.get("https://pokeapi.co/api/v2/pokemon")
        console.log(response.data);//response.data contains the data that we need
        const PokemonResults=response.data.results;
        console.log(response.data.results);
        //now let us fetch the main data
        //downloading every pokemon
     const PokemonResultPromise=PokemonResults.map((pokemon)=>(
          axios.get(pokemon.url)
        )
        )
        const pokemonData=await axios.all(PokemonResultPromise)//will return all the data when all the data will be downloaded
        console.log(pokemonData);
      const res=  pokemonData.map((pokeData)=>{
            const Pokemon=pokeData.data
            return {id:Pokemon.id,name:Pokemon.name,image:(Pokemon.sprites.other)?Pokemon.sprites.other.dream_world.front_default:Pokemon.sprites.front_shiny,types:Pokemon.types}
    })
      console.log(res);
      setPokemonList(res);
        setLoading(false)


    }
    useEffect(()=>{
        downloadPokemons()
    },[])
  return (
    <div className='pokemon-list-wrapper'>
      <div className='pokemon-wrapper'> {(loading)?"Loading....":pokemonList.map((poke)=>(
        <Pokemon name={poke.name} image={poke.image} type={poke.type} key={poke.id}/>
      ))}</div>
     <div className='controls'>
        <button>Prev</button>
        <button>Next</button>
     </div>
    </div>
  )
}

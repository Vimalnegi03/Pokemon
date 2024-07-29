import React,{useEffect,useState} from 'react'
import axios from 'axios'
import "./PokemonList.css"
import Pokemon from '../Pokemon/Pokemon';
export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const[pokedexUrl,setPokedexurl]=useState("https://pokeapi.co/api/v2/pokemon")
    const [prevUrl,setPrevUrl]=useState("");
    const[nextUrl,setNextUrl]=useState("");
    async function downloadPokemons()
    {
        setLoading(true)
        const response=await axios.get(pokedexUrl)
        console.log(response.data);//response.data contains the data that we need
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)
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
    },[pokedexUrl])
  return (
    <div className='pokemon-list-wrapper'>
      <div className='pokemon-wrapper'> {(loading)?"Loading....":pokemonList.map((poke)=>(
        <Pokemon name={poke.name} image={poke.image} type={poke.type} key={poke.id} id={poke.id}/>
      ))}</div>
     <div className='controls'>
        <button disabled={prevUrl==undefined} onClick={()=>setPokedexurl(prevUrl)}>Prev</button>
        <button disabled={nextUrl==undefined} onClick={()=>setPokedexurl(nextUrl)}>Next</button>
     </div>
    </div>
  )
}

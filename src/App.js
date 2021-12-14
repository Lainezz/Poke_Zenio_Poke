
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState();
  
  function getId(evento){
    console.log(evento.target.value);
    const pokemonId = evento.target.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(pokemonFromApi => {
        setPokemon(pokemonFromApi);
        console.log(pokemonFromApi);
        console.log(pokemon);
      });
  }

  function getClassNameForType(type){
    
    switch(type){
      case "grass":
        return "green";
      case "water":
        return "blue";
      case "poison":
        return "purple";
      case "fire":
        return "red";
      case "flying":
        return "gray";
      case "electric":
        return "yellow";
      default:
        return "";
    }
  }
  

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <label>PokemonID</label>
          <input type="number" onChange={getId}></input>
        </div>
        {pokemon && (
          <div>
            <p>Nombre: {pokemon.name}</p>
            <img src={pokemon.sprites.front_default}></img>
            {pokemon.types.map((type)=>(
              <p className={getClassNameForType(type.type.name)}>{type.type.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

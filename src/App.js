
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState();
  
  function handleForm(evento){
    evento.preventDefault();
    
    console.log(evento.target.id.value);
    
    const pokemonId = evento.target.id.value;
    if(pokemonId){
      doFetch(pokemonId);
      return;
    }

    const pokemonName = evento.target.name.value;
    if(pokemonName){
      doFetch(pokemonName);
      return;
    }

    console.log("aqui");
  }

  function doFetch(valorPokemonToFetch){
    fetch(`https://pokeapi.co/api/v2/pokemon/${valorPokemonToFetch}`)
      .then(response => response.json())
      .then(pokemonFromApi => {
        setPokemon(pokemonFromApi);
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
        <form onSubmit={handleForm}>
        
          <div className="row p-2">
            <div className="col-md-6 col-xs-12">
              <label>ID Pokemon</label>
            </div>
            <div className="col-md-6 col-xs-12">
              <input type="number" id="id" placeholder="Seleccione ID"/>
            </div> 
            <div className="col-md-6 col-xs-12">
              <label>Nombre Pokemon</label>
            </div>
            <div className="col-md-6 col-xs-12">
              <input type="text" id="name" placeholder="Escriba Nombre"/>
            </div>
          </div>
          <div className="d-flex justify-content-center pb-2">
              <button className="btn btn-success" type="submit">Comprobar</button>
              <button className="btn btn-danger" type="reset">Limpiar</button>
          </div>
        
        </form>
        {pokemon && (
          <div className="caja">
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

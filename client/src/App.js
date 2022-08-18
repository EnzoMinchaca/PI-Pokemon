import './App.css';
import React from 'react';
import { Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import CreatePokemon from './Components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <React.Fragment>
      <Route exact path={'/'} component={LandingPage} />
      <Route exact path={'/home'} component={Home} />
      <Route exact path={'/pokemons/:id'} component={Detail}/>
      <Route exact path={'/create'} component={CreatePokemon}/>
    </React.Fragment>
  );
}

export default App;

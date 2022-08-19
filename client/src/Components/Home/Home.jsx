import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPokemons, clearDetail,clearPokemons } from "../../Redux/actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from "../Paginado/Paginado";
import Filters from "../Filters/Filters";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import s from './Home.module.css'

export default function Home() {
    const allPokemons = useSelector(state => state.pokemons)
    console.log(allPokemons)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonPerPage, setPokemonPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonPerPage 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage   
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)      
    const [order, setOrder] = useState('')  

    const paginado = (numPage) => {
        setCurrentPage(numPage)     
    }   

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(clearDetail())
    }, [])

    function handleRefresh() {
        dispatch(clearPokemons())
        dispatch(getPokemons())
    }

    return(
        <div className={s.content}>
            <NavBar/>
            <div>
                {
                    allPokemons === "Pokemon not found" ? 
                        <div className={s.not}>
                            <h1>Pokémon not found</h1>
                            <button onClick={(e) => handleRefresh(e)} className={s.refresh}>Refresh</button>
                        </div>
                    :
                <div>
                    {
                        allPokemons.length > 0 ?
                            <div>    
                                <div>
                                    <SearchBar setCurrentPage={setCurrentPage} />                        
                                </div>     
                                <div>
                                    <Filters setCurrentPage={setCurrentPage} setOrder={setOrder}/>
                                </div>   
                                <div>
                                    <Paginado pokemonPerPage={pokemonPerPage} allPokemons={allPokemons.length} paginado={paginado} />
                                </div>           
                                <div className={s.cards}>
                                    {
                                        currentPokemons?.map(p => {
                                            return(
                                                <div key={p.id} className={s.card}>
                                                    <NavLink to={`/pokemons/${p.id}`} className={s.text}>
                                                        <Card key={p.id} id={p.id} name={p.name} image={p.img} types={p.types}/>
                                                    </NavLink>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        : 
                            <div>
                                <Loading/>
                            </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}
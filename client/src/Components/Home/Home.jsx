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
    const indexOfLastPokemon = currentPage * pokemonPerPage //en un principio va a ser 6
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage   //0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)      //el slice agarra un array y toma una porcion dependiendo de lo que le pase por paramtro               //constante que guarda todos los personajes que tengo en cada pagina      //osea en la pagina 1 me renderiza del 0 al 5, de la pagina 2 del 6 al 11 pero sin tomar el ultimo numero y asi es como solo agarra 6 por pagina, osea se guarda cuales personajes se van a ir renderizando dependiendo de la pagina
    const [order, setOrder] = useState('')  //me hago un estado local el cual primeramente le asigno un valor vacio

    const paginado = (numPage) => {
        setCurrentPage(numPage)     //eso me setea a una nueva pagina, es la que me va a ayudar en el renderizado, me va a setear la pagina en el numero que yo vaya apretando
    }   //osea cuando se setea esa pagina todos los indices de los const de arriba cambian y el slice se va a ir modificando

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
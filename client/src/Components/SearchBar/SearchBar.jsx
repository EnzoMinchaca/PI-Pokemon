import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons, clearPokemons } from "../../Redux/actions";
import s from './SearchBar.module.css'

export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [pokemon, setPokemon] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setPokemon(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(clearPokemons())
        dispatch(getNamePokemons(pokemon))
        setPokemon("")
        setCurrentPage(1)
    }

    return(
        <div className={s.content}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Pokemon..." value={pokemon} onChange={(e) => handleInputChange(e)} className={s.input}/>
                <input type="submit" value={'Search'} className={s.button}/>
            </form>
        </div>
    )
}
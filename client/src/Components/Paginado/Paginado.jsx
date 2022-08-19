import React from "react";
import s from './Paginado.module.css'

export default function Paginado({pokemonPerPage, allPokemons, paginado}) {
    const pageNumbers = []  

    for(let i = 0; i < Math.ceil(allPokemons / pokemonPerPage); i++) {  
        pageNumbers.push(i + 1)     
    }

    return (
        <nav className={s.content}>
            <ul className={s.ul}>
                {
                    pageNumbers?.map(number => (    
                        <li key={number} className={s.li}>  
                            <a onClick={() => paginado(number)}>{number}</a>    
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
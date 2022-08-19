import React from "react";
import s from './Paginado.module.css'
//este es el componente que me va a renderizar los numeros de las paginas
export default function Paginado({pokemonPerPage, allPokemons, paginado}) {
    const pageNumbers = []  //aca irian todos los numeros de paginas que puedan haber

    for(let i = 0; i < Math.ceil(allPokemons / pokemonPerPage); i++) {  //con esa cuenta nos va a dar la cantidad de paginas que van a haber redondeando hacia arriba para que no queden cartas sobrantes sino para que si se da que quede una pagina con espacios libres aun
        pageNumbers.push(i + 1)     //le pusheo i xq seria el indice o dicho de otra forma le estoy pusheando el numero de pagina que puede existir
    }

    return (
        <nav className={s.content}>
            <ul className={s.ul}>
                {
                    pageNumbers?.map(number => (    //si hay algo en el array de las paginas posibles
                        <li key={number} className={s.li}>   {/*una key xq sino piensa que cada li es igual al otro y asi nos evitamos los warning*/}
                            <a onClick={() => paginado(number)}>{number}</a>    {/*//por cada numero de pagina me va a crear un link(osea cada numero va a ser un link) que al hacerle click se ejecuta paginado que lo que hace es setear el estado al numero de pagina que se le pasa por parametro, en este caso seria el mismo numero que estamos mapeando*/}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
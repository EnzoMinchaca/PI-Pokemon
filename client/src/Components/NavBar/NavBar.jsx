import React from "react";
import { NavLink, Link } from "react-router-dom";
import s from './NavBar.module.css'
import logo from '../../Img/pokemonTitle.png'

export default function NavBar() {
    return(
        <header>
            <nav className={s.content}>
                <Link to={'/'}>
                    <img className={s.logo} src={logo} alt="Logo" />
                </Link>
                <div className={s.home}>
                    <NavLink className={s.text} to={'/home'}>Home</NavLink>
                </div>
                <div className={s.create}>
                    <NavLink className={s.text} to={'/create'}>Create Pokémon</NavLink>
                </div>
            </nav>
        </header>
    )
}
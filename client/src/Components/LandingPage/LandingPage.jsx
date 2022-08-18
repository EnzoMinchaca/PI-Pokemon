import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Img/pokemonTitle.png'
import s from './LandingPage.module.css'

export default function LandingPage() {
    return(
        <div className={s.background}>
            <img className={s.logo} src={logo} alt="Logo" />
            <h1 className={s.title}>Welcome to Pokémon!</h1>
            <Link to={'/home'}>
                <button className={s.button}>Go!</button>
            </Link>
        </div>
    )
}
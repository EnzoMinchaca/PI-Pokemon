import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Img/pokemonTitle.png'
import li from '../../Img/link.png'
import git from '../../Img/github.png'
import s from './LandingPage.module.css'

export default function LandingPage() {
    return(
        <div className={s.background}>
            <img className={s.logo} src={logo} alt="Logo" />
            <h1 className={s.title}>Welcome to Pokémon!</h1>
            <Link to={'/home'}>
                <button className={s.button}>Go!</button>
            </Link>
            <div className={s.content}>
                <a href="https://www.linkedin.com/in/enzo-minchaca-345809228/" target={"_blank"}>
                    <img className={s.li} src={li} alt="linkedin" />
                </a>
                <a href="https://github.com/EnzoMinchaca" target={"_blank"}>
                    <img className={s.git} src={git} alt="github" />
                </a>
            </div>
        </div>
    )
}
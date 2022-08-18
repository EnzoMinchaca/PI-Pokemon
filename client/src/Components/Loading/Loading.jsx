import React from "react";
import pokeball from '../../Img/pokeball.gif'
import s from './Loading.module.css'

export default function Loading() {
    return(
        <div className={s.content}>
            <img className={s.pokeball} src={pokeball} alt="pokeball" />
            <h2 className={s.text}>Loading...</h2>
        </div>
    )
}
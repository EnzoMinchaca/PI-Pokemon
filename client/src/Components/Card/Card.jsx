import React from "react";
import s from './Card.module.css'
import { NavLink } from "react-router-dom";

export default function Card({name, image, types}) {
    return(
        <div className={s.content}>
            <div className={s.first}>
                <img className={s.img} src={image} alt="Pokemon" />
            </div>
            <div className={s.data}>
                <h2 className={s.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                <div className={s.types}>
                    {
                        types.map(t => {
                            return(
                                <span className={s.type}>{t.name ? t.name : t}</span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
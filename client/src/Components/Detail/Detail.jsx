import React from "react";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getDetail } from "../../Redux/actions";
import { deletePokemon } from "../../Redux/actions";
import s from './Detail.module.css'

export default function Detail() {
    const dispatch = useDispatch()
    const detail = useSelector(state => state.details)
    const params = useParams()
    const history = useHistory()
    // console.log(id)
    // console.log(props.match.params)

    useEffect(() => {
        dispatch(getDetail(params.id))
    }, [])

    function handleDelete(idPokemon) {
        dispatch(deletePokemon(idPokemon))
        alert("Successfully deleted pokemon")
        history.push('/home')
    }

    return(
        <div>
            <NavBar/>
            {
                detail.length > 0 ? 
                <div className={s.content}>
                    <div className={s.part}>
                        <div className={s.contImg}>
                            <img src={detail[0].img} alt="Pokemon" className={s.img}/>
                        </div>
                        <div className={s.contInfo}>
                            <div className={s.id}>
                                <p>ID: {detail[0].id}</p>
                            </div>
                            <div className={s.name}>
                                <h1>{detail[0].name.charAt(0).toUpperCase() + detail[0].name.slice(1)}</h1>
                            </div>
                            <div className={s.types}>
                                {
                                    detail[0].types[0].hasOwnProperty("name") ? detail[0].types.map(t => {
                                        return(
                                            <span key={t.id} className={s.type}>{t.name}</span>
                                        )
                                    }) : 
                                    detail[0].types.map(t => {
                                        return(
                                            <span key={t.id} className={s.type}>{t}</span>
                                        )
                                    })
                                }
                            </div>
                            <div className={s.first}>
                                <span className={s.firstDivision}>                                    
                                    HP: {detail[0].hp}                                 
                                </span>
                                <span className={s.firstDivision}>
                                        Speed: {detail[0].speed}
                                </span>
                            </div>
                            <div className={s.first}>
                                <span className={s.firstDivision}>
                                    Attack: {detail[0].attack}
                                </span>
                                <span className={s.firstDivision}>
                                    Defense: {detail[0].defense}
                                </span>
                            </div>
                            <div className={s.first}>
                                <span className={s.firstDivision}>
                                    Height: {detail[0].height + "cm"}
                                </span>
                                <span className={s.firstDivision}>
                                    Weight: {detail[0].weight + "kg"}
                                </span>
                            </div>
                        </div>
                    </div>                   
                        {
                            detail[0].createdInDb &&
                            <div className={s.contBtt}>
                                <button onClick={() => handleDelete(params.id)} className={s.button}>Delete</button>
                            </div> 
                        }                  
                </div>
                : 
                    <div>
                        <Loading/>
                    </div>
            }
        </div>
    )
}
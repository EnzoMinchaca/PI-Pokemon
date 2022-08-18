import React from "react";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon, clearPokemons } from "../../Redux/actions";
import s from './CreatePokemon.module.css'

export default function CreatePokemon() {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const [flag, setFlag] = useState(true)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        hp: 50,
        attack: 75,
        defense: 75,
        speed: 50,
        height: 100,
        weight: 50,
        img: "",
        type: []
    })

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    function validate(input) {
        let errors = {}
        if(!/^[a-z]{3,15}$/i.test(input.name)) {
            errors.name = "Name is required, between 3 and 15 letters and without numbers"
        } 
        if(input.type.length === 0) {
            console.log(input.type)
            errors.type = "Type is required"
        } 
        if(!/^(ftp|http|https):\/\/[^ "]+$/.test(input.img)) {
            errors.img = 'Format: "ftp", "http" or "https"'
        }
        setFlag(false)
        // console.log(errors)
        setInput({
            ...input,
            name: input.name.charAt(0).toLowerCase() + input.name.slice(1)
        })
        return errors
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        // console.log(input)
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        if(input.type.length < 2) {
            setInput({
                ...input,
                type: [...input.type, e.target.value]
            })
            setErrors(validate({
                ...input,
                type: [...input.type, e.target.value]
            }))
        } else {
            alert("Only a maximum of 2 types")
            e.target.value = "Type..."
        }
    }

    function handleDelete(option) {
        setInput({
            ...input,
            type: input.type.filter(t => t !== option)
        })
        setErrors(validate({
            ...input,
            type: input.type.filter(t => t !== option)
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(!errors.name && !errors.type && !errors.img && !flag) {
            // console.log(input.name)
            dispatch(postPokemon(input))
            alert("Pokemon created")
            setInput({
                name: "",
                hp: 50,
                attack: 75,
                defense: 75,
                speed: 50,
                height: 100,
                weight: 50,
                img: "",
                type: []
            })
            setFlag(true)
            dispatch(clearPokemons())
        } else {
            alert("Check the fields")
            setErrors({name:"Name between 3 and 15 letters, without numbers and spaces", 
                img:'Format: "ftp", "http" or "https"', 
                type: ["Type is required"]
            })
        }
    }

    return(
        <div>
            <NavBar/>
            <div className={s.content}>
                <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
                    <div className={s.name}>
                        <label>*Name: </label>
                        <input 
                            className={errors.name ? s.danger : s.input}
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        <p className={s.p}>Name between 3 and 15 letters, without numbers and spaces</p>
                    </div>
                    <div className={s.pares}>
                        <label>HP: </label>
                        <input
                            type="range" 
                            min={0} 
                            max={100} 
                            value={input.hp} 
                            name={"hp"}
                            onChange={(e) => handleChange(e)}
                        />
                        <div>{input.hp}</div>
                    </div>
                    <div className={s.pares}>
                        <label>Attack: </label>
                        <input
                            type="range" 
                            min={0} 
                            max={150} 
                            value={input.attack} 
                            name={"attack"}
                            onChange={(e) => handleChange(e)}
                        />
                        <div>{input.attack}</div>
                    </div>
                    <div className={s.pares}>
                        <label>Defense: </label>
                        <input
                            type="range" 
                            min={0} 
                            max={150} 
                            value={input.defense} 
                            name={"defense"}
                            onChange={(e) => handleChange(e)}
                        />
                        <div>{input.defense}</div>
                    </div>
                    <div className={s.pares}>
                        <label>Speed: </label>
                        <input
                            type="range" 
                            min={0} 
                            max={100} 
                            value={input.speed} 
                            name={"speed"}
                            onChange={(e) => handleChange(e)}
                        />
                        <div>{input.speed}</div>
                    </div>
                    <div className={s.pares}>
                        <label>Height: </label>
                        <input
                            type="range" 
                            min={0} 
                            max={200} 
                            value={input.height} 
                            name={"height"}
                            onChange={(e) => handleChange(e)}
                        />
                        <div>{input.height}</div>
                    </div>
                    <div className={s.pares}>
                        <label>Weight: </label>
                        <input
                            type="range" 
                            min={0} 
                            max={100} 
                            value={input.weight} 
                            name={"weight"}
                            onChange={(e) => handleChange(e)}
                        />
                        <div>{input.weight}</div>
                    </div>
                    <div className={s.order}>
                        <label>*URL Image: </label>
                        <input 
                            className={errors.img ? s.danger : s.input}
                            type="text"
                            value={input.img}
                            name={"img"}
                            onChange={(e) => handleChange(e)}
                        />
                        <p className={s.p}>Format: "ftp", "http" or "https"</p>
                    </div>
                    <div className={s.order}>
                        <label>*Type: </label>
                        <select onChange={(e) => handleSelect(e)} className={s.select}>
                            <option disabled="true" selected className={errors.type && s.danger}>Type...</option>
                            {
                                types?.map(t => {
                                    return(
                                        <option value={t.name} key={t.id}>{t.name}</option>
                                    )
                                })
                            }
                        </select>
                            {
                                errors.type && (
                                    <p className={s.p}>{errors.type}</p>
                                )
                            }
                    </div>
                    <div className={s.typesbox}>
                        {
                            input.type?.map(t => {
                                return(
                                    <p className={s.type} onClick={() => handleDelete(t)}>{t}</p>
                                )
                            })
                        }
                    </div>
                    <input type={"submit"} value={"Create"} className={s.button}/>
                </form>
            </div>
        </div>
    )
}
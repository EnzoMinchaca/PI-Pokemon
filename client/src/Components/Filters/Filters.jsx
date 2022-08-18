import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, filterCreated, filterType, filterOrderAttack, eliminateFilters } from "../../Redux/actions";
import s from './Filters.module.css'

export default function Filters({setCurrentPage, setOrder}) {
    const dispatch = useDispatch()
    const allTypes = useSelector(state => state.types)

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterType(e) {
        e.preventDefault()
        dispatch(filterType(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterOrderAttack(e) {
        e.preventDefault()
        dispatch(filterOrderAttack(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    function handleRefresh(e) {
        e.preventDefault()
        dispatch(eliminateFilters())
        setCurrentPage(1)
    }

    return(
        <div>
            <select onChange={(e) => handleFilterOrderAttack(e)} className={s.select}>
                <option disabled="true" selected="true">Order Name-Attack</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option value="+attack">Attack ↑</option>
                <option value="-attack">Attack ↓</option>
            </select>
            <select onChange={(e) => handleFilterType(e)} className={s.select}>
                <option disabled="true" selected="true">Type</option>
                {
                    allTypes?.map(t => {
                        return(
                            <option value={t.name} key={t.id}>{t.name}</option>
                        )
                    })
                }
            </select>
            <select onChange={(e) => handleFilterCreated(e)} className={s.select}>
                <option value={"All"}>All</option>
                <option value={"Original"}>Original</option>
                <option value={"Created"}>Created</option>
            </select>
            <button onClick={(e) => handleRefresh(e)} className={s.select}>Refresh</button>
        </div>
    )
}
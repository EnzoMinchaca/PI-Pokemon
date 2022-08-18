import axios from 'axios'

export function getPokemons() {
    return async function(dispatch) {
        let pokemons = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: 'GET_POKEMONS',
            payload: pokemons.data
        })
    }
}

export function getTypes() {
    return async function(dispatch) {
        let types = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: 'GET_TYPES',
            payload: types.data
        })
    }
}

export function getNamePokemons(name) {
    return async function(dispatch) {
        let pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        return dispatch({
            type: 'GET_NAME_POKEMONS',
            payload: pokemon.data
        })
    }
}

export function getDetail(id) {
    return async function(dispatch) {
        let pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: 'GET_DETAIL',
            payload: pokemon.data
        })
    }
}

export function clearDetail() {
    return {
        type: 'CLEAR_DETAIL'
    }
}

export function clearPokemons() {
    return {
        type: 'CLEAR_POKEMONS'
    }
}

export function filterCreated(value) {
    return {
        type: 'FILTER_CREATED',
        payload: value
    }
}

export function filterType(value) {
    return {
        type: 'FILTER_TYPE',
        payload: value
    }
}

export function filterOrderAttack(value) {
    return {
        type: 'FILTER_ORDER_ATTACK',
        payload: value
    }
}

export function eliminateFilters() {
    return {
        type: 'ELIMINATE_FILTERS'
    }
}

export function postPokemon(pokemon) {
    return async function(dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/pokemons', pokemon)
            console.log(response)
            console.log(pokemon)
            // alert('Pokemon created!')
            return dispatch({
                type: 'POST_POKEMON',
                payload: pokemon
            })
        }
        catch(e) {
            alert('Pokémon with this name already exists')
            console.log(e)
        }
    }
}

export function deletePokemon(id) {
    return async function(dispatch) {
        try {
            const response = await axios.delete(`http://localhost:3001/pokemons/${id}`)
            console.log(response)
            return dispatch({
                type: 'DELETE_POKEMON',
                payload: id
            })
        }
        catch(e) {
            console.log(e)
        }
    }
}
const initialState = {
    pokemons: [],
    allPokemons: [],
    details: [],
    types: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {...state, pokemons: action.payload, allPokemons: action.payload}
        case 'CLEAR_POKEMONS':
            return {...state, pokemons: []}
        case 'GET_TYPES':
            return {...state, types: action.payload}
        case 'GET_NAME_POKEMONS':
            return {...state, pokemons: action.payload}
        case 'GET_DETAIL':
            return {...state, details: action.payload}
        case 'CLEAR_DETAIL':
            return {...state, details: []}
        case 'POST_POKEMON':
            return {...state}
        case 'DELETE_POKEMON':
            return {...state, pokemons: state.pokemons.filter(p => p.id !== action.payload)}
        case 'ELIMINATE_FILTERS':
            return {...state, pokemons: state.allPokemons}
        case 'FILTER_CREATED':
            const allPokemons = state.allPokemons
            let createdFilter = action.payload === 'Created' ? allPokemons.filter(p => p.createdInDb) : allPokemons.filter(p => !p.createdInDb)
            if(createdFilter.length === 0) {
                alert("No pokemon created")
                createdFilter = allPokemons
            }
            return {...state, pokemons: action.payload === 'All' ? allPokemons : createdFilter}
        case 'FILTER_TYPE':
            const allPokemon = state.allPokemons;
            const typeDbFiltered = allPokemon.filter(e => e.types.some(e => e.name === action.payload));
            const typeApiFiltered = allPokemon.filter(e => e.types.includes(action.payload))
            let typeFiltered = [...typeApiFiltered, ...typeDbFiltered]
            if(typeFiltered.length === 0){
                typeFiltered = allPokemon;   
                alert('There are no pokemon of the indicated type');
            }
            return {
                ...state,
                pokemons: typeFiltered
            }
            case 'FILTER_ORDER_ATTACK':
                const pokemon = state.allPokemons
                let orderArray = []
                if(action.payload === "asc") {
                    orderArray = pokemon.sort(function(a, b) {
                        if(a.name > b.name) {
                            return 1
                        }
                        if(b.name > a.name) {
                            return -1
                        }
                        return 0
                    })
                } else if(action.payload === "desc") {
                    orderArray = pokemon.sort(function(a, b) {
                        if(a.name > b.name) {
                            return -1
                        }
                        if(b.name > a.name) {
                            return 1
                        }
                        return 0 
                    })
                } else if(action.payload === "+attack") {
                    orderArray = pokemon.sort(function(a, b) {
                        if(a.attack > b.attack) {
                            return -1
                        }
                        if(b.attack > a.attack) {
                            return 1
                        }
                        return 0 
                    })
                } else if(action.payload === "-attack") {
                    orderArray = pokemon.sort(function(a, b) {
                        if(a.attack > b.attack) {
                            return 1
                        }
                        if(b.attack > a.attack) {
                            return -1
                        }
                        return 0 
                    })
                }
                return {...state, pokemons: orderArray}
        default:
            return {...state}
    }   
}
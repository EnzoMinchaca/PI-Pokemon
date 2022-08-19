const axios = require('axios')
const { Pokemon, Type } = require('../db')  

const getPokeApiInfo = async() => {
    try {
        let pokemons = []   
        const infoApi = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')  
        let pokeInfo = infoApi.data.results.map(e => axios.get(e.url))    
        let allPokemons = Promise.all(pokeInfo)     
            .then(response => {     
                response.map(p => {     
                    pokemons.push({     
                        id: p.data.id,
                        name: p.data.name,
                        hp: p.data.stats[0].base_stat,
                        attack: p.data.stats[1].base_stat,
                        defense: p.data.stats[2].base_stat,
                        speed: p.data.stats[5].base_stat,
                        height: p.data.height,
                        weight: p.data.weight,
                        types: p.data.types.map(t => t.type.name),
                        img: p.data.sprites.other.home.front_default,
                    })
                })
                return pokemons; 
            })
        return allPokemons
    }
    catch(e) {
        console.log(e)
    }
}

const getDbInfo = async() => {  
    return await Pokemon.findAll({  
        include: {      
            model: Type,    
            attributes: ['name'],   
            through: {              
                attributes: [],  
            },   
        }  
    });
};

const getAllPokemons = async() => {
    try {
        const infoApi = await getPokeApiInfo()  
        const infoDb = await getDbInfo()
        const allPokemons = [...infoApi, ...infoDb] 
        return allPokemons     
    }
    catch(e) {
        console.log(e)
    }
}

const getTypesPokemons = async() => {
    try {
        const infoType = await axios.get('https://pokeapi.co/api/v2/type')  
        const types = infoType.data.results.map(e => e.name)    
        return types
    } 
    catch(e) {
        console.log(e)
    }   
}


module.exports = {
    getPokeApiInfo,
    getDbInfo,
    getAllPokemons,
    getTypesPokemons
}










// function getTypes() {
//     return new Promise((resolved, reject) => {
//         resolved(axios.get('https://pokeapi.co/api/v2/type'))
//         reject()
//     })
// }

// const getAllTypes = getTypes().then(response => {console.log(response.data.results.map(e => e.name))})
// // console.log(getAllTypes)
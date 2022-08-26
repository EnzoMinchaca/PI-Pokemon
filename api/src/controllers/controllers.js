const axios = require('axios')
const { Pokemon, Type } = require('../db')  //me los traigo de db xq ahi se exportan los modelos inyectados con sequelize

const getPokeApiInfo = async() => {
    try {
        let pokemons = []   //me creo un arreglo xq en mas abajo voy a tener una promesa y no puedo guuradar datos en todo el quilombo
        const infoApi = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=60')  //tengo que hacer otra request xq dentro hay una url donde esta mas info, results es un array de objetos    data = {results: [], etc}
        let pokeInfo = infoApi.data.results.map(e => axios.get(e.url))    //ahora si ya tengo toda la info para mapear, pero por cada pokeInfo va a hacer un request, y si va de uno en uno va a tardar mucho, tengo que hacer que se hagan todas al mismo tiempo
        let allPokemons = Promise.all(pokeInfo)     //data = {[{pok1}, {pok2}, ...]} = response?        //me traigo toda la info a la vez xq todos tienen request y demorarian
            .then(response => {     //mi response es el array de objetos pokemon
                response.map(p => {     //entonces por cada objeto tengo que guardarme cada dato del mismo, me lo guardo en el array declarado al principio     //despues probar si funciona sin el arreglo del principio, solo con el map de objeto
                    pokemons.push({     //le pusheo cada objeto pokemon con los datos necesarios a mostrar
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

const getDbInfo = async() => {  //traigo la info de la base de datos
    return await Pokemon.findAll({  //que me encuentre y traiga todos los pokemon
        include: {      //pero que ademas me incluyas:
            model: Type,    //este modelo Type 
            attributes: ['name'],   //y de ese modelo traeme este attribute (que atributo de ese modelo de arriba me incluyas en dicha llamada)
            through: {              
                attributes: [],  //mediante los attributes, es una comprobacion que se hace cuando traemos algun atributo, e iria siempre que llamemos a uno
            },    //tambien es para indicarle que no me traiga ningun atributo de la tabla que los une(tabla de union) xq Type tiene tambien todos los atributos de la tabla de union al estar referenciada en ella  
        }   //osea le digo: traeme este modelo mediante el nombre, osea la funcion haria, traeme el pokemon y el nombre de su tipo
    });
};

const getAllPokemons = async() => {
    try {
        const infoApi = await getPokeApiInfo()  //invoco las funciones para tener los arrays con cada info
        const infoDb = await getDbInfo()
        const allPokemons = [...infoApi, ...infoDb]  //concateno los arrays
        return allPokemons      //devuelvo un unico array con todos los pokemons con esta funcion
    }
    catch(e) {
        console.log(e)
    }
}

const getTypesPokemons = async() => {
    try {
        const infoType = await axios.get('https://pokeapi.co/api/v2/type')  //data = {results:[{type1}, {type2}, ...]}
        const types = infoType.data.results.map(e => e.name)    //ahora tengo un array de types => [type1, type2, ...]
        return types
    } 
    catch(e) {
        console.log(e)
    }   
}

// function getTypes() {
//     return new Promise((resolved, reject) => {
//         resolved(axios.get('https://pokeapi.co/api/v2/type'))
//         reject()
//     })
// }

// const getAllTypes = getTypes().then(response => {console.log(response.data.results.map(e => e.name))})
// // console.log(getAllTypes)

module.exports = {
    getPokeApiInfo,
    getDbInfo,
    getAllPokemons,
    getTypesPokemons
}

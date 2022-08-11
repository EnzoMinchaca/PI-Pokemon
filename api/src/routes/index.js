const { Router } = require('express');
const { getAllPokemons, getPokeApiInfo, getDbInfo, getTypesPokemons } = require('../controllers/controllers')
const { Pokemon, Type } = require('../db')  //me los traigo de db xq ahi se exportan los modelos inyectados con sequelize

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async(req, res) => {
    const {name} = req.query    //me traigo el name pasado por query
    const allPokemons = await getAllPokemons()  //me triago el array de todos los pokemons
    if(name) {
        let pokemonName = await allPokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))   //filtro todos los names que incluyan en alguna parte el name pasado por query para que asi sea mas abarcativo y no tan especifico como con el ===
        pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send("Pokemon not found")
    }   //si ya hay mas de uno en el array me devuelve ese array que contiene a todos los names que incluyen al pasado por query sino f 
    else {  //este es el otro caso de que no hay query entonces directamente trae todos los pokemon
        res.status(200).json(allPokemons)
    }
})

router.get('/pokemons/:idPokemon', async(req, res) => {
    const {idPokemon} = req.params
    const allPokemons = await getAllPokemons()  //me traigo todos los personajes para luego filtrar el que coincida con el id
    if(idPokemon) {     //si hay id...
        let pokemonId = await allPokemons.filter(e => e.id == idPokemon)    //filtro por el id que coincida
        pokemonId.length ? res.status(200).json(pokemonId) : res.status(404).send("Pokemon not found")
    }   //si hay un elemento en el array lo devuelvo sino error
})

router.get('/types', async(req, res) => {
    const types = await getTypesPokemons()  //me traigo el array de types    
    types.forEach(e => {    //para cada elemento
        Type.findOrCreate({     //entra a Type y busca o crea segun...
            where: {        //donde el valor del atributo name sea el del elemento
                name: e     
            }   //creame en type estas types que te pase
        })  // osea buscaria en la db que hayan las ocupaciones que anteriormente trajimos de la api, si las encuentra en la db no hace nada y sino las encuentra las crea
    })
    const allTypes = await Type.findAll()   //luego solo traigo todas los types que estan en la db Type
    res.status(200).send(allTypes)   //y los devuelvo
})

router.post('/pokemons', async(req, res) => {
    try {
        let {
            name, 
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
            type,
            createdInDb
        } = req.body
        let pokemonCreated = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
            createdInDb
        })
        let typeDb = await Type.findAll({   //el type debo encontrarlo en el modelo que tiene todos los types xq tiene que se un type valido ya existente
            where: {    //donde coincida con las que le pase por body
                name: type      //puede ser solo una o un array
            }
        })  //hacemos con add xq es una relacion de distintos modelos, no puedo crear una propiedad type seria innecesario si ya tiene la relacion con el modelo Type
        pokemonCreated.addType(typeDb)  //entonces luego a ese pokemon que estamos creando le agrego estas types que coincidieron con el que pase por body
        res.status(200).send('Pokemon creado exitosamente')     //no validamos que la info este bien xq ya lo hacemos desde el front
    } 
    catch(e) {
        console.log(e)
    }
    
})




module.exports = router;

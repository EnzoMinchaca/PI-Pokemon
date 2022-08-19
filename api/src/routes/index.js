const { Router } = require('express');
const { getAllPokemons, getPokeApiInfo, getDbInfo, getTypesPokemons } = require('../controllers/controllers')
const { Pokemon, Type } = require('../db')  //me los traigo de db xq ahi se exportan los modelos inyectados con sequelize

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async(req, res) => {
    const {name} = req.query    
    const allPokemons = await getAllPokemons() 
    if(name) {
        let pokemonName = await allPokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))  
        pokemonName.length ? res.status(200).send(pokemonName) : res.send("Pokemon not found")
    }  
    else {  
        res.status(200).json(allPokemons)
    }
})

router.get('/pokemons/:idPokemon', async(req, res) => {
    try {
        const {idPokemon} = req.params
        const allPokemons = await getAllPokemons() 
        if(idPokemon) {     
            let pokemonId = allPokemons.filter(e => e.id == idPokemon)    
            pokemonId.length ? res.status(200).send(pokemonId) : res.status(404).send("Pokemon not found")
    }  
    }
    catch(e) {
        console.log(e)
    }
    
})

router.get('/types', async(req, res) => {
    try {
        const types = await getTypesPokemons()     
        types.forEach(e => {    
            Type.findOrCreate({     
                where: {        
                    name: e     
                }  
            })  
        })
        const allTypes = await Type.findAll()   
        res.status(200).send(allTypes)  
    }
    catch(e) {
        console.log(e)
    }
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
        let typeDb = await Type.findAll({  
            where: {    
                name: type      
            }
        })  
        pokemonCreated.addType(typeDb)  
        res.status(200).send('Successfully created pokemon')     
    } 
    catch(e) {
        console.log(e)
    }

})

router.delete('/pokemons/:id', async(req, res) => {
    const {id} = req.params
    const pokemon = await Pokemon.findByPk(id)
    if(pokemon) {
        pokemon.destroy()
        res.status(200).send("Pokemon deleted")
    } else {
        res.status(404).send("Invalid id")
    }
})


module.exports = router;

const router = require('express').Router()

const Show = require('../models/show')



// create dados
router.post('/', async (req, res)=>{

    //req.body
    const {nome,artistas,data} = req.body

    if (!nome) {
        res.status(422).json({error: 'o nome é obrigatorio'})
        return
    }

    const show = {
        nome,
        artistas,
        data
    }

    try {
        // criando dados
        await Show.create(show)

        res.status(201).json({message: 'show inserido no sistema com sucesso' })
    } catch (error) {
        res.status(500).json({error: error})
    }
})


// readt - leitura de dados
router.get('/', async(req,res)=>{
    try {

    const shows = await Show.findAll()
        
    if (!shows || shows.length === 0) {
        console.log('Nenhuma shows encontrada');
        res.status(200).json([]);
        return;
    }
    res.status(200).json(shows)
    } catch (error) {
        res.status(500).json({error: error})

    }
})


router.get('/:id', async(req,res)=>{
    
    //extrait dado da requisicao,pela url = req.params
    const id =req.params.id

    try {
        const show = await Show.findByPk(id);

        if (!show) {
            res.status(422).json({message: 'O show não foi encontrada'})
            return
        }

        res.status(200).json(show)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//update - atualizacao de dados(PUT, PATCH)
router.patch('/:id', async(req,res) =>{

    const id = req.params.id

    const {nome,artista,data} = req.body

    const show ={
        nome,
        artista,
        data
    }

    try{
    const updateShow = await Show.update(show, {where: {id: id}})

    if(updateShow.matchedCount===0){
        res.status(422).json({message: 'show nao encontrado'})
        return
    }
        res.status(200).json(show)
    }   catch(error){
        res.status(500).json({error: error})

    }

})

// delete

router.delete('/:id', async(req,res)=>{

    const id = req.params.id

    const show = await Show.findByPk(id)

    if (!show) {
        res.status(422).json({message: 'O show não foi encontrado'})
        return
    }

    try {
        show.destroy();

        res.status(200).json({message: 'show removido com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})

    }

})


module.exports = router;
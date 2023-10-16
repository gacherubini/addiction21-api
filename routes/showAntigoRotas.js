const router = require('express').Router()

const ShowAntigo = require('../models/showAntigo')



// create dados
router.post('/', async (req, res)=>{

    //req.body
    const {nome,artistas,data, imagem} = req.body

    if (!nome) {
        res.status(422).json({error: 'o nome é obrigatorio'})
        return
    }

    const show = {
        nome,
        artistas,
        data,
        imagem
    }

    try {
        // criando dados
        await ShowAntigo.create(show)

        res.status(201).json({message: 'festa inserida no sistema com sucesso' })
    } catch (error) {
        res.status(500).json({error: error})
    }
})


// readt - leitura de dados
router.get('/', async(req,res)=>{
    try {

    const show = await ShowAntigo.find()

    res.status(200).json(show)

    } catch (error) {
        res.status(500).json({error: error})

    }
})


router.get('/:id', async(req,res)=>{
    
    //extrait dado da requisicao,pela url = req.params
    const id =req.params.id

    try {
        const show = await ShowAntigo.findOne({_id: id})

        if (!show) {
            res.status(422).json({message: 'A festa não foi encontrada'})
            return
        }

        res.status(200).json(festa)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//update - atualizacao de dados(PUT, PATCH)
router.patch('/:id', async(req,res) =>{

    const id = req.params.id

    const {nome,artista,data, imagem} = req.body

    const show ={
        nome,
        artista,
        data,
        imagem
    }

    try{

        const updateShow = await ShowAntigo.updateOne({_id: id}, festa)

        if(updateShow.matchedCount===0){
            res.status(422).json({message: 'festa nao encontrada'})
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

    const show = await ShowAntigo.findOne({_id: id})

    if (!show) {
        res.status(422).json({message: 'A festa não foi encontrada'})
        return
    }

    try {
        await ShowAntigo.deleteOne({_id: id})

        res.status(200).json({message: 'festa removido com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})

    }

})


module.exports = router;
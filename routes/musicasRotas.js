    const router = require('express').Router()

    const Musica = require('../models/musica')



    // create dados
    router.post('/', async (req, res)=>{

        //req.body
        const {nome,artistas,data, imagem, link} = req.body

        if (!nome) {
            res.status(422).json({error: 'o nome é obrigatorio'})
            return
        }

        const musica = {
            nome,
            artistas,
            data,
            imagem,
            link
        }

        try {
            // criando dados
            await Musica.create(musica)

            res.status(201).json({message: 'musica inserida no sistema com sucesso' })
        } catch (error) {
            res.status(500).json({error: error})
        }
    })


    // readt - leitura de dados
    router.get('/', async(req,res)=>{
        try {

        const music = await Musica.find()

        res.status(200).json(music)

        } catch (error) {
            res.status(500).json({error: error})
        }
    })


    router.get('/:id', async(req,res)=>{
        
        //extrait dado da requisicao,pela url = req.params
        const id =req.params.id

        try {
            const music = await Musica.findOne({_id: id})

            if (!music) {
                res.status(422).json({message: 'A musica não foi encontrada'})
                return
            }

            res.status(200).json(music)
        } catch (error) {
            res.status(500).json({error: error})
        }

    })

    //update - atualizacao de dados(PUT, PATCH)
    router.patch('/:id', async(req,res) =>{

        const id = req.params.id

        const {nome,artista,data, imagem, link} = req.body

        const music ={
            nome,
            artista,
            data,
            imagem,
            link
        }

        try{

            const updateMusic = await Musica.updateOne({_id: id}, music)

            if(updateMusic.matchedCount===0){
                res.status(422).json({message: 'musica nao encontrada'})
                return
            }
            res.status(200).json(music)
        }   catch(error){
            res.status(500).json({error: error})

        }

    })

    // delete

    router.delete('/:id', async(req,res)=>{

        const id = req.params.id

        const music = await Musica.findOne({_id: id})

        if (!music) {
            res.status(422).json({message: 'O musica não foi encontrado'})
            return
        }

        try {
            await Musica.deleteOne({_id: id})

            res.status(200).json({message: 'musica removido com sucesso'})
        } catch (error) {
            res.status(500).json({error: error})
        }

    })


    module.exports = router;
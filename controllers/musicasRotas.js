    const express = require('express');
    const router = express.Router();
    const Musica = require('../models/musica')

    router.post('/', async (req, res)=>{
        console.log('Recebida solicitação POST');

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


    router.get('/', async (req, res) => {
        try {
            const music = await Musica.findAll();

            if (!music || music.length === 0) {
                res.status(200).json([]);
                return;
            }

            res.status(200).json(music);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });



    router.get('/:id', async(req,res)=>{
        console.log('Recebida solicitação GET / para listar 1 musica');

        const id = req.params.id

        try {
            const music = await Musica.findByPk(id);

            if (!music) {
                res.status(422).json({message: 'A musica não foi encontrada'})
                return
            }

            res.status(200).json(music)
        } catch (error) {
            res.status(500).json({error: error})
        }

    })

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

            const updateMusic = await Musica.update(music, {where: {id: id}})

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
    router.delete('/:id', async (req, res) => {
        const id = req.params.id;

        try {
            const music = await Musica.findByPk(id)

            if (!music) {
                return res.status(422).json({ message: 'A música não foi encontrada' });
            }

            await music.destroy();

            res.status(200).json({ message: 'Música removida com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


    module.exports = router;
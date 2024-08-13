const express = require('express');
const router = express.Router();
const Artista = require('../models/artista')

router.post('/', async (req, res)=>{
    const {nome,descricao,imagem, insta, soundcloud,youtube} = req.body

    if (!nome) {
        res.status(422).json({error: 'o nome é obrigatorio'})
        return
    }

    const artista = {
        nome,
        descricao,
        imagem,
        insta,
        soundcloud,
        youtube
    }

    try {
        await Artista.create(artista)

        res.status(201).json({message: 'artista inserido no sistema com sucesso' })
    } catch (error) {
        res.status(500).json({error: error})
    }
})


router.get('/', async (req, res) => {
    try {
        const artista = await Artista.findAll();

        if (!artista || artista.length === 0) {
            res.status(200).json([]);
            return;
        }

        res.status(200).json(artista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/:id', async(req,res)=>{
    const id = req.params.id

    try {
        const artista = await Artista.findByPk(id);

        if (!artista) {
            res.status(422).json({message: 'O artista não foi encontrada'})
            return
        }

        res.status(200).json(artista)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.patch('/:id', async(req,res) =>{
    const id = req.params.id

    const {nome,descricao,imagem, insta, soundcloud,youtube} = req.body

    const artista = {
        nome,
        descricao,
        imagem,
        insta,
        soundcloud,
        youtube
    }

    try{
    // testar
        const updatedArtista = await Artista.update(artista, {where: {id: id}})

        if(updatedArtista.matchedCount===0){
            res.status(422).json({message: 'updatedArtista nao encontrada'})
            return
        }
        res.status(200).json(updatedArtista)
    }   catch(error){
        res.status(500).json({error: error})

    }

})

// delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const artista = await Artista.findByPk(id)

        if (!artista) {
            return res.status(422).json({ message: 'A artista não foi encontrada' });
        }

        await artista.destroy();

        res.status(200).json({ message: 'artista removida com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
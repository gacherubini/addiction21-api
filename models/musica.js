const mongoose = require('mongoose')

const Musica = mongoose.model('musica', {
    nome: String,
    artistas: String,
    data: String,
    imagem: String,
    link: String
});

module.exports = Musica
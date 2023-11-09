const mongoose = require('mongoose')

const Track = mongoose.model('track', {
    nome: String,
    imagem: String,
    link: String,
    descricao: String
});

module.exports = Track
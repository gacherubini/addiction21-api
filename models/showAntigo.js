const mongoose = require('mongoose')

const ShowAntigo = mongoose.model('showAntigo', {
    nome: String,
    artistas: String,
    data: String,
    imagem: String
});

module.exports = ShowAntigo
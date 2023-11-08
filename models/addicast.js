const mongoose = require('mongoose')

const Addicast = mongoose.model('addicast', {
    nome: String,
    imagem: String,
    link: String,
    descricao: String
});

module.exports = Addicast
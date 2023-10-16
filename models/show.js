const mongoose = require('mongoose')

const Show = mongoose.model('show', {
    nome: String,
    artistas: String,
    data: String
});

module.exports = Show
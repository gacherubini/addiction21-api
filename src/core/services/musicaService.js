const Musica = require('../models/musica');

class MusicaService {
    async createMusica(data) {
        return Musica.create(data);
    }

    async getAllMusicas() {
        return Musica.findAll();
    }

    async getMusicaById(id) {
        return Musica.findByPk(id);
    }

    async updateMusica(id, data) {
        const musica = await Musica.findByPk(id);
        if (!musica) {
            throw new Error('Música não encontrada');
        }
        return musica.update(data);
    }

    async deleteMusica(id) {
        const musica = await Musica.findByPk(id);
        if (!musica) {
            throw new Error('Música não encontrada');
        }
        await musica.destroy();
    }
}

module.exports = MusicaService;

const Artista = require('../models/artista');

class ArtistaService {
    async createArtista(data) {
        return Artista.create(data);
    }

    async getAllArtistas() {
        return Artista.findAll();
    }

    async getArtistaById(id) {
        const artista = await Artista.findByPk(id);
        if (!artista) {
            throw new Error('Artista não encontrado');
        }
        return artista;
    }

    async updateArtista(id, data) {
        const artista = await Artista.findByPk(id);
        if (!artista) {
            throw new Error('Artista não encontrado');
        }
        return artista.update(data);
    }

    async deleteArtista(id) {
        const artista = await Artista.findByPk(id);
        if (!artista) {
            throw new Error('Artista não encontrado');
        }
        await artista.destroy();
        return { message: 'Artista removido com sucesso' };
    }
}

module.exports = ArtistaService;

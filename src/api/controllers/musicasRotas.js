class MusicaController {
    constructor(musicaService) {
        this.musicaService = musicaService;
    }

    async getAll(req, res) {
        try {
            const musicas = await this.musicaService.getAllMusicas();
            res.status(200).json(musicas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        const id = req.params.id;
        try {
            const musica = await this.musicaService.getMusicaById(id);
            if (!musica) {
                return res.status(404).json({ message: 'Música não encontrada' });
            }
            res.status(200).json(musica);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        const { nome, artistas, data, imagem, link } = req.body;
        if (!nome) {
            return res.status(422).json({ error: 'O nome é obrigatório' });
        }
        try {
            const musica = await this.musicaService.createMusica({ nome, artistas, data, imagem, link });
            res.status(201).json({ message: 'Música inserida com sucesso', musica });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const { nome, artistas, data, imagem, link } = req.body;
        try {
            const musicaAtualizada = await this.musicaService.updateMusica(id, { nome, artistas, data, imagem, link });
            res.status(200).json(musicaAtualizada);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            await this.musicaService.deleteMusica(id);
            res.status(200).json({ message: 'Música removida com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MusicaController;

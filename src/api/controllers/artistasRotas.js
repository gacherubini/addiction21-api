class ArtistaController {
    constructor(artistaService) {
        this.artistaService = artistaService;
    }

    async getAll(req, res) {
        try {
            const artistas = await this.artistaService.getAllArtistas();
            res.status(200).json(artistas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        const id = req.params.id;
        try {
            const artista = await this.artistaService.getArtistaById(id);
            if (!artista) {
                return res.status(404).json({ message: 'Artista não encontrado' });
            }
            res.status(200).json(artista);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        const { nome, imagem, descricao } = req.body;
        if (!nome) {
            return res.status(422).json({ error: 'O nome é obrigatório' });
        }
        try {
            const artista = await this.artistaService.createArtista({ nome, imagem, descricao });
            res.status(201).json({ message: 'Artista inserido com sucesso', artista });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const { nome, imagem, descricao } = req.body;
        try {
            const artistaAtualizado = await this.artistaService.updateArtista(id, { nome, imagem, descricao });
            res.status(200).json(artistaAtualizado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            await this.artistaService.deleteArtista(id);
            res.status(200).json({ message: 'Artista removido com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ArtistaController;

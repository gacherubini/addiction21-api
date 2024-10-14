class NewsController {

    constructor(NewsService) {
        this.newsService = NewsService;
    }

    async getAll(req, res) {
        try {
            const news = await this.newsService.getAllNews();
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        const id = req.params.id;

        try {
            const newsItem = await this.newsService.getNewsById(id);
            if (!newsItem) {
                return res.status(404).json({ message: 'Notícia não encontrada' });
            }
            res.status(200).json(newsItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        const { title, content, author, publicationDate, imageUrl, tags, externalLink } = req.body;

        if (!title || !content || !author) {
            return res.status(422).json({ error: 'Título, conteúdo e autor são obrigatórios' });
        }

        try {
            const newsItem = await this.newsService.createNews({ title, content, author, publicationDate, imageUrl, tags, externalLink });
            res.status(201).json({ message: 'Notícia criada com sucesso', newsItem });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const { title, content, author, publicationDate, imageUrl, tags, externalLink } = req.body;
        try {
            const updatedNews = await this.newsService.updateNews(id, { title, content, author, publicationDate, imageUrl, tags, externalLink });
            res.status(200).json(updatedNews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            await this.newsService.deleteNews(id);
            res.status(200).json({ message: 'Notícia removida com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = NewsController;

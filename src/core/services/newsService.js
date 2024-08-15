const News = require('../models/news');

class NewsService {
    async createNews(data) {
        return News.create(data);
    }

    async getAllNews() {
        return News.findAll();
    }

    async getNewsById(id) {
        const newsItem = await News.findByPk(id);
        if (!newsItem) {
            throw new Error('Notícia não encontrada');
        }
        return newsItem;
    }

    async updateNews(id, data) {
        const newsItem = await News.findByPk(id);
        if (!newsItem) {
            throw new Error('Notícia não encontrada');
        }
        return newsItem.update(data);
    }

    async deleteNews(id) {
        const newsItem = await News.findByPk(id);
        if (!newsItem) {
            throw new Error('Notícia não encontrada');
        }
        await newsItem.destroy();
        return { message: 'Notícia removida com sucesso' };
    }
}

module.exports = NewsService;

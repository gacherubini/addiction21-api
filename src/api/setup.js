const sequelize = require('../infra/database/db');

const EmailService = require('../core/services/emailService');
const SpotifyService = require('../core/services/spotifyService');
const NewsService = require('../core/services/newsService');
const MusicaService = require('../core/services/musicaService');

const SpotifyController = require('./controllers/spotifyController');
const ContatoController = require('./controllers/contatoController');
const NewsController = require('./controllers/newsController');
const MusicaController = require('./controllers/musicasControllers');

const newsService = new NewsService();
const musicaService = new MusicaService();

const spotifyController = new SpotifyController(SpotifyService);
const contatoController = new ContatoController(EmailService);
const newsController = new NewsController(newsService);
const musicaController = new MusicaController(musicaService);

module.exports = {
    newsController,
    musicaController,
    spotifyController,
    contatoController,
    sequelize
};

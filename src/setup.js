const sequelize = require('./infra/database/db');

const EmailService = require('./core/services/emailService');
const SpotifyService = require('./core/services/spotifyService');
const NewsService = require('./core/services/newsService');
const MusicaService = require('./core/services/musicaService');

const SpotifyController = require('./api/controllers/spotifyController');
const ContatoController = require('./api/controllers/contatoController');
const NewsController = require('./api/controllers/newsController');
const MusicaController = require('./api/controllers/musicasControllers');

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

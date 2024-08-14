const sequelize = require('./infra/database/db');

const EmailService = require('./core/services/emailService');
const SpotifyService = require('./core/services/spotifyService');
const ArtistaService = require('./core/services/artirstaService');
const MusicaService = require('./core/services/musicaService');

const SpotifyController = require('./api/controllers/spotifyController');
const ContatoController = require('./api/controllers/contatoController');
const ArtistaController = require('./api/controllers/artistasController');
const MusicaController = require('./api/controllers/musicasControllers');

const artistaService = new ArtistaService();
const musicaService = new MusicaService();

const spotifyController = new SpotifyController(SpotifyService);
const contatoController = new ContatoController(EmailService);
const artistaController = new ArtistaController(artistaService);
const musicaController = new MusicaController(musicaService);

module.exports = {
    artistaController,
    musicaController,
    spotifyController,
    contatoController,
    sequelize
};

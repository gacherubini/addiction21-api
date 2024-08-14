const sequelize = require('./infra/database/db');

// Instancie seus serviços e controladores aqui
const SpotifyService = require('./core/services/spotifyService');
const ArtistaService = require('./core/services/artirstaService');
const MusicaService = require('./core/services/musicaService');

const SpotifyController = require('./api/controllers/spotifyRotas');
const ArtistaController = require('./api/controllers/artistasRotas');
const MusicaController = require('./api/controllers/musicasRotas');

const artistaService = new ArtistaService();
const musicaService = new MusicaService();

const spotifyController = new SpotifyController(SpotifyService);
const artistaController = new ArtistaController(artistaService);
const musicaController = new MusicaController(musicaService);

module.exports = {
    artistaController,
    musicaController,
    spotifyController,
    sequelize
};

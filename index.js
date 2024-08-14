const express = require('express');
const cors = require('cors');
const { spotifyController, artistaController, musicaController, sequelize, contatoController } = require('./src/setup');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/musica', musicaController.getAll.bind(musicaController));
app.get('/musica/:id', musicaController.getById.bind(musicaController));
app.post('/musica', musicaController.create.bind(musicaController));
app.patch('/musica/:id', musicaController.update.bind(musicaController));
app.delete('/musica/:id', musicaController.delete.bind(musicaController));

app.get('/addicast', spotifyController.getPlaylistTracks.bind(spotifyController));

app.get('/artista', artistaController.getAll.bind(artistaController));
app.get('/artista/:id', artistaController.getById.bind(artistaController));
app.post('/artista', artistaController.create.bind(artistaController));
app.patch('/artista/:id', artistaController.update.bind(artistaController));
app.delete('/artista/:id', artistaController.delete.bind(artistaController));

app.post('/contato', contatoController.SendEmail.bind(contatoController));

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Database synchronized.');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const express = require('express');
const cors = require('cors');
const { spotifyController, newsController, musicaController, sequelize, contatoController } = require('./src/api/setup');

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

app.get('/news', newsController.getAll.bind(newsController));
app.get('/news/:id', newsController.getById.bind(newsController));
app.post('/news', newsController.create.bind(newsController));
app.patch('/news/:id', newsController.update.bind(newsController));
app.delete('/news/:id', newsController.delete.bind(newsController));

app.post('/contato', contatoController.SendEmail.bind(contatoController));

app.get("/greet", (req, res) => {
    const name = req.query.name || "World";
    res.json({ message: `Hello, ${name}!` });
    });

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

module.exports = app;

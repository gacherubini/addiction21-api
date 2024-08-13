const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./db'); // Certifique-se de que a instância do Sequelize está sendo importada corretamente

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
const musicaControllers = require('./controllers/musicasRotas');
const addicastControllers = require('./controllers/addicastRotas');
const artistatControllers = require('./controllers/addicastRotas');


app.use('/musica', musicaControllers);
app.use('/addicast', addicastControllers);
app.use('/artista', artistatControllers);

app.get('/', (req, res) => {
    res.json({ message: 'oi express' });
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

try {
    console.log('Trying to start server');
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
}

require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan'); // для удобных логов (по желанию)
const moviesRouter = require('./routers/movies');
const logger = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 3000;

const externalRouter = require('./routers/external');
app.use('/api/external', externalRouter);

// Middleware
app.use(express.json()); // обработка JSON тела
app.use(express.urlencoded({ extended: false }));

app.use(logger); // наш собственный middleware
app.use(morgan('dev')); // дополнительный middleware для логов

// Раздача статических файлов
app.use('/', express.static(path.join(__dirname, 'public')));

// API маршруты
app.use('/api/movies', moviesRouter);

// Простейшая страница api root
app.get('/api', (req, res) => {
    res.json({ message: 'Movie wishlist API', routes: ['/api/movies'] });
});

// Обработка ошибок (error-handling middleware)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});


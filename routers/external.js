const express = require('express');
const router = express.Router();
const { searchMovies } = require('../services/poiskkinoService');

const { getMoviesWithFilters } = require('../services/poiskkinoService');

// GET /api/external/search?q=matrix
router.get('/search', async (req, res) => {
    const q = req.query.q;

    if (!q) return res.status(400).json({ error: 'Parameter q required' });

    try {
        const data = await searchMovies(q);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/external/movie?page=1&limit=20&rating.imdb=8-10&sortField=rating.imdb&sortType=-1
router.get('/movie', async (req, res) => {
    try {
        const data = await getMoviesWithFilters(req.query);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message, docs: [] });
    }
});


module.exports = router;

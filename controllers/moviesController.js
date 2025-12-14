const repo = require('../repository/moviesRepo');

async function listMovies(req, res, next) {
    try {
        const movies = await repo.getAll(req.query);
        res.json(movies);
    } catch (err) {
        next(err);
    }
}

async function getMovie(req, res, next) {
    try {
        const id = req.params.id;
        const movie = await repo.getById(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        next(err);
    }
}

async function addMovie(req, res, next) {
    try {
        const payload = req.body;
        const newMovie = await repo.create(payload);
        res.status(201).json(newMovie);
    } catch (err) {
        next(err);
    }
}

async function editMovie(req, res, next) {
    try {
        const id = req.params.id;
        const patch = req.body;
        const updated = await repo.update(id, patch);
        if (!updated) return res.status(404).json({ error: 'Movie not found' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function deleteMovie(req, res, next) {
    try {
        const id = req.params.id;
        const ok = await repo.remove(id);
        if (!ok) return res.status(404).json({ error: 'Movie not found' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

module.exports = { listMovies, getMovie, addMovie, editMovie, deleteMovie };

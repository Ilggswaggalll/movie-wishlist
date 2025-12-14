const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '..', 'data', 'movies.json');

async function readAll() {
    try {
        const raw = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(dataPath, '[]', 'utf8');
            return [];
        }
        throw err;
    }
}

async function writeAll(movies) {
    await fs.writeFile(dataPath, JSON.stringify(movies, null, 2), 'utf8');
}

async function getAll(query = {}) {
    const movies = await readAll();
    // Простейшая фильтрация по query: ?watched=true&title=Matrix
    let res = movies;
    if (query.watched !== undefined) {
        const val = query.watched === 'true';
        res = res.filter(m => Boolean(m.watched) === val);
    }
    if (query.title) {
        const q = query.title.toLowerCase();
        res = res.filter(m => m.title.toLowerCase().includes(q));
    }
    return res;
}

async function getById(id) {
    const movies = await readAll();
    return movies.find(m => m.id === id) || null;
}

async function create(movieData) {
    const movies = await readAll();
    const newMovie = {
        id: movieData.id,
        title: movieData.title,
        year: movieData.year || null,
        poster: movieData.poster,
        notes: movieData.notes || '',
        watched: movieData.watched || false
    };
    movies.push(newMovie);
    await writeAll(movies);
    return newMovie;
}

async function update(id, patch) {
    const movies = await readAll();
    const idx = movies.findIndex(m => m.id === id);
    if (idx === -1) return null;
    movies[idx] = { ...movies[idx], ...patch };
    await writeAll(movies);
    return movies[idx];
}

async function remove(id) {
    const movies = await readAll();
    const idx = movies.findIndex(m => m.id === id);
    if (idx === -1) return false;
    movies.splice(idx, 1);
    await writeAll(movies);
    return true;
}

module.exports = { getAll, getById, create, update, remove };

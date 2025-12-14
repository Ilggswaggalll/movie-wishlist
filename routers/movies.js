const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/moviesController');
const validateMovie = require('../middlewares/validateMovie');

// GET /api/movies?watched=true&title=matrix
router.get('/', ctrl.listMovies);

// GET /api/movies/:id
router.get('/:id', ctrl.getMovie);

// POST /api/movies
router.post('/', validateMovie, ctrl.addMovie);

// PUT /api/movies/:id
router.put('/:id', validateMovie, ctrl.editMovie);

// DELETE /api/movies/:id
router.delete('/:id', ctrl.deleteMovie);

module.exports = router;

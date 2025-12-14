module.exports = function validateMovie(req, res, next) {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length < 1) {
        return res.status(400).json({ error: 'Поле "title" обязательно и должно быть непустой строкой' });
    }
    // при необходимости можно добавить проверку года, watched и пр.
    next();
};

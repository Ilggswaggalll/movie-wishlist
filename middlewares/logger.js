// простой логер, демонстрирует работу middleware
module.exports = function logger(req, res, next) {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    // можно также добавить логи в файл или external service
    next();
};

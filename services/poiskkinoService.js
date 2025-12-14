const axios = require('axios');

const BASE = process.env.POISKKINO_API_BASE;
const KEY = process.env.POISKKINO_API_KEY;

async function searchMovies(query, opts = {}) {
    try {
        const resp = await axios.get(`${BASE}/v1.4/movie/search`, {
            params: {
                query,
                limit: opts.limit || 10,
                page: opts.page || 1
            },
            headers: {
                'X-API-KEY': KEY
            }
        });

        return resp.data; // API возвращает объект вида { docs: [...], total, limit, page }
    } catch (err) {
        console.error(err.response?.data || err);
        throw new Error("Ошибка при запросе к PoiskKino API");
    }
}

// ИСПРАВЛЕННАЯ функция getMoviesWithFilters
async function getMoviesWithFilters(params = {}) {
    try {
        if (!BASE || !KEY) {
            throw new Error('API configuration missing');
        }

        const queryParams = {
            page: params.page ?? 1,
            limit: params.limit ?? 20,


            // сортировка ТОЛЬКО через массивы
            sortField: ['year'],
            sortType: [-1],
        };

        // аккуратно добавляем остальные фильтры
        if (params.year) queryParams.year = params.year;
        if (params.type) queryParams.type = params.type;
        if (params['rating.kp']) queryParams['rating.kp'] = params['rating.kp'];

        console.log('Final params:', queryParams);

        const resp = await axios.get(`${BASE}/v1.4/movie`, {
            params: queryParams,
            headers: {
                'X-API-KEY': KEY
            }
        });

        return resp.data;
    } catch (err) {
        console.error('PoiskKino error:', err.response?.data || err.message);
        throw new Error('Ошибка при запросе к PoiskKino API');
    }
}



module.exports = { searchMovies, getMoviesWithFilters };


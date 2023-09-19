const express = require('express');
const { getAllCities } = require("../service/city");
const router = express.Router();
const redis = require('../redis/redis');

const CACHE_KEY = 'city';
const CACHE_TTL = 3600; // TTL là 1 giờ (3600 giây)

router.get('/', async (req, res) => {
    try {
        const {offset, limit} = req.query;
        if (limit > 100) {
            res.status(500).json({message: 'Quá giới hạn limit tối đa 100'});
        }
        // Kiểm tra xem dữ liệu đã có trong Redis cache hay chưa
        const cacheKey = `${CACHE_KEY}:${limit}:${offset}`;
        let cityData = await redis.get(CACHE_KEY);

        if (!cityData) {
            console.log('Dữ liệu không tồn tại trong Redis cache. Fetching from the database...');
            // Thực hiện truy vấn SQL với offset và limit
            cityData = await getAllCities(limit, offset);
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(cityData));
            console.log(`Dữ liệu đã được lưu vào Redis với key: ${cacheKey} và TTL 1 giờ.`);
        } else {
            console.log('Trả về dữ liệu từ Redis cache.');
        }
        res.json(JSON.parse(cityData));
    } catch (error) {
        console.error('Lỗi khi truy cập dữ liệu:', error);
        res.status(500).json({ message: 'Error accessing data' });
    }
});

module.exports = router;

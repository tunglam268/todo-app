const express = require('express');
const {getAllWards} = require('../service/ward'); // Đây là hàm có thể thực hiện truy vấn SQL với offset và limit
const router = express.Router();
const redis = require('../redis/redis');

const CACHE_KEY = 'ward'; // Sử dụng một key prefix để lưu trữ các phần dữ liệu riêng biệt
const CACHE_TTL = 3600; // TTL là 1 giờ (3600 giây)

router.get('/', async (req, res) => {
    try {
        const {offset, limit} = req.query;
        if (limit > 100) {
            res.status(500).json({message: 'Quá giới hạn limit tối đa 100'});
        }

        const cacheKey = `${CACHE_KEY}:${limit}:${offset}`;
        let wardData = await redis.get(cacheKey);

        if (!wardData) {
            console.log('Dữ liệu không tồn tại trong Redis cache. Fetching from the database...');

            // Thực hiện truy vấn SQL với offset và limit
            wardData = await getAllWards(limit, offset);
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(wardData));
            console.log(`Dữ liệu đã được lưu vào Redis với key: ${cacheKey} và TTL 1 giờ.`);
        } else {
            console.log('Trả về dữ liệu từ Redis cache.');
        }
        res.json(JSON.parse(wardData));
    } catch (error) {
        console.error('Lỗi khi truy cập dữ liệu:', error);
        res.status(500).json({message: 'Error accessing data'});
    }
});

module.exports = router;

const db = require('../database/connect');
const redis = require('../redis/redis');

// Hàm để lấy dữ liệu từ cơ sở dữ liệu và lưu vào Redis
function getAllCities(limit, offset) {
    // Truy vấn dữ liệu từ cơ sở dữ liệu (giả sử bạn sử dụng MySQL)
    const sql = 'SELECT id, city_name, city_code FROM cities FROM wards LIMIT ${limit} OFFSET ${offset}';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching todos:', err);
        }
        if (results.length > 0) {
            // Lưu dữ liệu vào Redis với key là 'district'
            const redisKey = `ward:${limit}:${offset}`;

            redis.set(redisKey, JSON.stringify(results), (err, reply) => {
                if (err) {
                    console.error('Lỗi khi lưu dữ liệu vào Redis:', err);
                } else {
                    console.log(`Dữ liệu thành phố đã được lưu vào Redis với key ${redisKey}.`);
                }
            });
        } else {
            console.log('Không có dữ liệu thành phố từ cơ sở dữ liệu.');
        }
    });

}

module.exports = {
    getAllCities,
};

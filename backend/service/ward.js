const db = require('../database/connect');
const redis = require('../redis/redis');

// Hàm để lấy dữ liệu từ cơ sở dữ liệu và lưu vào Redis với key động
function getAllWards(limit, offset) {
    // Truy vấn dữ liệu từ cơ sở dữ liệu (giả sử bạn sử dụng MySQL)
    const sql = `SELECT id, ward_name, ward_code, districtID FROM wards LIMIT ${limit} OFFSET ${offset}`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching wards:', err);
        } else {
            if (results.length > 0) {
                // Lưu dữ liệu vào Redis với key là 'ward:limit:offset'
                const redisKey = `ward:${limit}:${offset}`;

                redis.set(redisKey, JSON.stringify(results), (err, reply) => {
                    if (err) {
                        console.error('Lỗi khi lưu dữ liệu vào Redis:', err);
                    } else {
                        console.log(`Dữ liệu quận đã được lưu vào Redis với key ${redisKey}.`);
                    }
                });
            } else {
                console.log('Không có dữ liệu quận từ cơ sở dữ liệu.');
            }
        }
    });
}

module.exports = {
    getAllWards,
};

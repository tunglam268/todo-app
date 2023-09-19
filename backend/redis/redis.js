const Redis = require("ioredis");

// Tạo một kết nối đến Redis server
const redis = new Redis({
    host: "localhost", // Thay đổi host và port nếu cần thiết
    port: 6379,
});

// Kiểm tra kết nối Redis
redis.ping((err, result) => {
    if (err) {
        console.error("Lỗi khi kết nối đến Redis:", err);
    } else {
        console.log("Kết nối đến Redis thành công.");
        // Bạn có thể thực hiện các thao tác với Redis tại đây
    }
});

module.exports = redis;

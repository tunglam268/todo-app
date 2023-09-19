const request = require('supertest');
const app = require('../test/testServer'); // Import ứng dụng của bạn

describe('POST /login', function () {
    it('should return a token when provided with valid credentials', function (done) {
        request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpassword' }) // Gửi dữ liệu trong req.body
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log('Response:', res.body);
                done();
            });
    });
});

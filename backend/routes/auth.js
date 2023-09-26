const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const db = require('../database/connect');
const {Login} = require("../service/auth");

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    // Thực hiện truy vấn SQL để kiểm tra tên người dùng và mật khẩu trong cơ sở dữ liệu
    Login(username, password,res)
});

module.exports = router;
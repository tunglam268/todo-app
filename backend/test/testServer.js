const express = require('express');
const app = express();

// Định nghĩa tuyến đường /login

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Test server is running on port ${port}`);
});

module.exports = app;

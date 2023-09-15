const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const authenticateToken = require('./middlewares/authentication');

app.use(cors());
app.use(bodyParser.json());

// API bảo vệ, yêu cầu xác thực
app.use('/',authRoutes)
app.use(['/todos','/users'], authenticateToken);
// Sử dụng các tuyến đường cụ thể
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

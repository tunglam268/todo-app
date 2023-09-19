const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8888;
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
const districtRoutes = require('./routes/district')
const cityRoute = require('./routes/city')
const wardRoute = require('./routes/ward')
const userRoutes = require('./routes/users');
const authenticateToken = require('./middlewares/authentication');

app.use(cors());
app.use(bodyParser.json());

// API bảo vệ, yêu cầu xác thực
app.use('/',authRoutes)
app.use(['/todos','/users','/district','/city','/ward'], authenticateToken);
// Sử dụng các tuyến đường cụ thể
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
app.use('/district',districtRoutes)
app.use('/city',cityRoute)
app.use('/ward',wardRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

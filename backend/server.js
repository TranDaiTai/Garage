const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// server.js
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRouters = require('./routes/cart');
const categoryRoutes = require('./routes/categories');
const addressRoutes = require('./routes/addresses');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const promotionRoutes = require('./routes/promotions');
const uploadRoutes = require('./routes/upload');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors(
  {origin: 'http://localhost:5173', // frontend URL
  credentials: true, // cho phép gửi cookie
}
));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // phải dùng trước router

// KHAI BÁO THƯ MỤC UPLOADS NHƯ MỘT STATIC FOLDER
// Điều này giúp trình duyệt có thể truy cập ảnh tĩnh qua domain
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

// Tích hợp Swagger UI vào endpoint `/api-docs`
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);  
app.use('/api/products',productRoutes);
app.use('/api/carts',cartRouters);
app.use('/api/categories', categoryRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/upload', uploadRoutes); // Route mới xử lý Upload

// Route test
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

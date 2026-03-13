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
const wishlistRoutes = require('./routes/wishlist');
const shippingRoutes = require('./routes/shipping');
const reviewRoutes = require('./routes/review');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

const app = express();
const PORT = 5000;

// Middleware
// cái này là do chính sách samesite cross 
// nghĩa là nếu server và frontend chạy ở 2 domain khác nhau thì cần cái này để nới rộng chính sách 
// nếu không có cái này thì sẽ không thể gửi cookie từ frontend sang server được
// origin: 'http://localhost:5173' là frontend URL
// credentials: true là cho phép gửi cookie

app.use(cors(
  {origin: 'http://localhost:5173', // frontend URL
  credentials: true, // cho phép gửi cookie
}
));
app.use(express.urlencoded({ extended: true }));
/*
Khi người dùng điền thông tin vào form (ví dụ: form Đăng nhập, form Thêm xe trong dự án Garga-Pro) và
 nhấn Submit, trình duyệt sẽ đóng gói dữ liệu đó dưới định dạng application/x-www-form-urlencoded.

Nhiệm vụ: Nó sẽ "mổ xẻ" cái gói dữ liệu đó và gán vào đối tượng req.body.

Nếu không có nó: Khi bạn gọi req.body.username, 
bạn sẽ nhận về undefined, mặc dù khách hàng đã nhập tên rồi.


*/
app.use(cookieParser()); // phải dùng trước router
/*
cái này dùng để đọc cookie từ frontend sang server
cookieParser() sẽ quét cái Header đó, tách các cặp key-value ra và bỏ vào đối tượng req.cookies
*/

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
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/shipping-methods', shippingRoutes);
app.use('/api/reviews', reviewRoutes);

// Route test
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

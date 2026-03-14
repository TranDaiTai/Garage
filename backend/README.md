# EcoMarket Backend API

Chào mừng bạn đến với tài liệu kỹ thuật cho phần Backend của dự án **EcoMarket**.

## 🚀 Công nghệ sử dụng
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database ORM**: Prisma (PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens) & Cookie-based sessions
- **File Upload**: Multer
- **API Documentation**: Swagger (OpenAPI 3.0)
- **Security**: Bcrypt.js (Mã hóa mật khẩu), CORS, Middleware bảo mật

---

## 📂 Cơ cấu thư mục
```text
backend/
├── config/             # Cấu hình hệ thống (DB, Passport, etc.)
├── controllers/        # Xử lý Logic nghiệp vụ (Yêu cầu & Phản hồi)
├── docs/               # Cấu hình Swagger API Documentation
├── middleware/         # Các hàm trung gian (Auth, Admin, Logging, Error)
├── prisma/             # Schema DB và file Seed dữ liệu mẫu
├── routes/             # Định nghĩa các Endpoint API
├── services/           # Tầng nghiệp vụ sâu (Tương tác trực tiếp với Prisma)
├── uploads/            # Thư mục chứa tệp tin tĩnh (Ảnh sản phẩm, v.v.)
└── server.js           # File khởi chạy chính
```

---

## 🛠 Hướng dẫn cài đặt

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Cấu hình Môi trường
Tạo file `.env` trong thư mục gốc của backend:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecomarket?schema=public"
JWT_SECRET="your_extremely_secure_secret_key"
PORT=5000
```

### 3. Thiết lập Database (Prisma)
```bash
npx prisma generate
npx prisma db push    # Đồng bộ schema lên DB
npm run seed          # Tạo dữ liệu mẫu (mặc định trong package.json)
```

### 4. Khởi chạy Server
```bash
npm run start         # Chạy bằng Nodemon (tự reload khi đổi code)
```

---

## 📖 Tài liệu API (Swagger)
Hệ thống tích hợp sẵn UI để bạn có thể test API trực tiếp:
- **URL**: `http://localhost:5000/api-docs`

---

## 🔐 Luồng Authentication
1. **Đăng nhập**: User gửi thông tin tới `/api/auth/login`.
2. **Token**: Server trả về `accessToken` và lưu `refreshToken` vào Cookie (httpOnly).
3. **Authorization**: Đưa Token vào header `Authorization: Bearer <token>` cho các request cần bảo mật.

---

## 📦 Các Module chính

### Products (`/api/products`)
- **GET /api/products**: Lấy danh sách sản phẩm (hỗ trợ phân trang, lọc theo category, giá).
- **GET /api/products/slug/:slug**: Xem chi tiết sản phẩm.
- **POST /api/products**: (Admin) Tạo sản phẩm mới.

### Cart (`/api/carts`)
- Đồng bộ giỏ hàng theo User ID trong Database.
- Hỗ trợ thêm/sửa/xóa item và xóa sạch giỏ hàng.

### Orders (`/api/orders`)
- Xử lý đặt hàng, lưu lịch sử trạng thái đơn hàng.
- Tích hợp với Address và Shipping Method.

---

## 📁 File Uploads
Tất cả ảnh tải lên sẽ được lưu tại `/uploads`. Để truy cập từ Frontend:
`http://localhost:5000/uploads/ten-file-anh.jpg`

---

> [!NOTE]
> Backend luôn chạy mặc định tại cổng `5000` để tránh xung đột với cổng `3000` của Next.js (Frontend).

require('dotenv').config();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware bảo vệ route - kiểm tra access token
exports.authMiddleware = async (req, res, next) => {
  try {
    let token = null;

    // 1. Ưu tiên lấy token từ header Authorization: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } 
    // 2. Nếu không có header, fallback lấy từ cookies
    else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Không có quyền truy cập. Vui lòng gửi kèm Access Token hợp lệ!",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Truy vấn thêm User từ DB nếu cần thông tin chính xác tại thời điểm hiện tại (như bị ban)
    // Tùy chọn: Để tối ưu hiệu năng có thể bỏ qua và chỉ dùng dữ liệu từ decoded.
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true }
    });

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "Người dùng không còn tồn tại trên hệ thống",
      });
    }

    // Đính kèm thông tin user vào req để các route sau xử lý
    req.user = {
      userId: currentUser.id,
      username: currentUser.username,
      role: currentUser.role ? currentUser.role.name : 'user'
    };

    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Access Token đã hết hạn" });
    }
    return res.status(401).json({ success: false, message: "Access Token không hợp lệ" });
  }
};

// Middleware kiểm tra quyền Admin
exports.adminMiddleware = (req, res, next) => {
  // Đảm bảo authMiddleware phải chạy trước đó để set req.user
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền thực hiện hành động này. Yêu cầu quyền Quản trị viên (Admin).",
    });
  }
};

// require('dotenv').config();
const jwt = require("jsonwebtoken");
const prisma = require("../src/lib/prisma");
const authService = require("../services/authService");
const { toUserDTO } = require("../utils/mappers");

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem có gửi username và password không
    if (!username || !password) {
      return res.status(400).json({
        // 400 Bad Request hợp lý hơn 401 ở đây
        success: false,
        message: "Vui lòng nhập tài khoản và mật khẩu",
      });
    }

    // Gọi API/service để xác thực người dùng
    const result = await authService.login(username, password); // truyền username, password vào

    if (!result?.user) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }

    // Tạo access token và refresh token
    const accessToken = jwt.sign(
      { userId: result.user.id, username: result.user.username }, // chỉ lưu những thông tin cần thiết
      process.env.JWT_SECRET, // sửa chính tả: SECRECT → SECRET
      { expiresIn: "15m" } // access token hết hạn sau 15 phút (tùy chỉnh theo nhu cầu)
    );

    const refreshToken = jwt.sign(
      { userId: result.user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // refresh token sống lâu hơn, ví dụ 7 ngày
    );

    // Có thể lưu refreshToken vào httpOnly cookie để tăng bảo mật (khuyến nghị)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });
    // ddeer demo backend
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Đăng nhập thành công",
      data: {
        user: toUserDTO(result.user),
        accessToken
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi đăng nhập",
    });
  }
};
// Refresh token - cấp lại access token mới
exports.refreshToken = async (req, res) => {
  // Lấy refreshToken từ cookie (an toàn hơn lấy từ body)
  try{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy refresh token",
      });
    }
  
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Refresh token không hợp lệ hoặc đã hết hạn",
        });
      }
      const {userId, username, role} = payload
      // Tạo access token mới từ payload của refresh token
      const newAccessToken = jwt.sign({userId,username}, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
  
      // ddeer demo backend
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // chỉ gửi qua HTTPS ở production
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, //
      });
  
      res.json({
        success: true,
        message: "Cấp lại access token thành công",
      });
    });
  }catch(err) {
    console.log(err)
    return res.json({
      success: false , 
     message: ' token hett hanj '
    })
  }
};
// Đăng xuất
exports.logout = async (req, res) => {
  // Cách đơn giản nhất phía server: xóa cookie refreshToken
  // (Access token sẽ tự hết hạn nhờ expiresIn ngắn)
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.json({
    success: true,
    message: "Đăng xuất thành công",
  });
};
exports.verify = (req, res) => {
  const { accessToken } = req.cookies;
  if (!accessToken)
    return res.status(401).json({
      success: false,
      message: "Chưa đăng nhập",
    });
  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, payload) => {
    if (err)
      return res.status(400).json({
        success: false,
        message: " invalid token",
      });
    
    // Tìm thông tin user đầy đủ để trả về cho frontend
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { role: true }
    });

    if(!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.json({
      success: true,
      data: { user: toUserDTO(user) },
    });
  });
};

const prisma = require("../src/lib/prisma");

// Hàm xác thực người dùng
exports.login = async (username, password) => {
  // Kiểm tra đầu vào
  if (!username || !password)
    throw new Error("username and password is not empty");

  // Tìm user theo username (hoặc email, tùy schema của bạn)
  const user = await prisma.user.findUnique({
    where: {
      username: username, // hoặc email: username nếu bạn dùng email để login
    },
    include: {
      addresses: true, // ví dụ nếu bạn muốn lấy luôn địa chỉ liên quan
      role: true,    // ví dụ nếu bạn có bảng roles liên quan
    },
  });

  // Nếu không tìm thấy user
  if (!user) throw new Error("username or password is not correctly");

  // Kiểm tra mật khẩu
  // LƯU Ý: Prisma KHÔNG tự mã hóa mật khẩu!
  // Bạn PHẢI dùng bcrypt để so sánh mật khẩu đã hash
  // const bcrypt = require('bcrypt');

  const isPasswordValid = password == user.passwordHash ? true : false;

  if (!isPasswordValid)
    throw new Error("username or password is not correctly");
  // Thành công → trả về user (không trả password!)
  const { password: _, ...userWithoutPassword } = user; // loại bỏ trường password

  return {
    user: userWithoutPassword,
  };
};

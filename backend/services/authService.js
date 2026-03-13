const prisma = require("../src/lib/prisma");

// Hàm xác thực người dùng
exports.login = async (username, password) => {
  // Kiểm tra đầu vào
  if (!username || !password)
    throw new Error("username and password is not empty");

  // Tìm user theo username HOẶC email
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username },
        { email: username } // username param may contain email
      ]
    },
    include: {
      addresses: true,
      role: true,
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

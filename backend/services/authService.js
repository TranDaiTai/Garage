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

  const bcrypt = require("bcryptjs");
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid)
    throw new Error("username or password is not correctly");
  // Thành công → trả về user (không trả mật khẩu!)
  const { passwordHash: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
  };
};

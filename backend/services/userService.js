const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs"); // Giả sử bạn có bcrypt để hash mật khẩu (nếu cần đổi pass)

exports.getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
      phone: true,
      avatarUrl: true,
      createdAt: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });
};

exports.getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
      phone: true,
      avatarUrl: true,
      createdAt: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });
};

exports.createUser = async (data) => {
  const { username, email, password, fullName, phone } = data;
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  return await prisma.user.create({
    data: {
      username,
      email,
      passwordHash,
      fullName,
      phone,
    },
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
    }
  });
};

exports.updateUser = async (id, data) => {
  const { fullName, phone, avatarUrl } = data;
  
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      fullName,
      phone,
      avatarUrl
    },
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
      phone: true,
      avatarUrl: true,
    }
  });
};

exports.deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};

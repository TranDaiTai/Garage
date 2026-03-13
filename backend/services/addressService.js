const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Lấy tất cả địa chỉ của một user
exports.getAddressesByUserId = async (userId) => {
  return await prisma.address.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { isDefault: 'desc' }
  });
};

exports.getAddressById = async (id) => {
  return await prisma.address.findUnique({
    where: { id: parseInt(id) }
  });
};

exports.createAddress = async (userId, data) => {
  const { phone, addressLine, city, country, isDefault } = data;
  
  // Nếu là địa chỉ mặc định, set các địa chỉ khác của user thành false
  if (isDefault) {
    await prisma.address.updateMany({
      where: { userId: parseInt(userId) },
      data: { isDefault: false }
    });
  }

  return await prisma.address.create({
    data: {
      userId: parseInt(userId),
      phone,
      addressLine,
      city,
      country,
      isDefault: isDefault || false
    }
  });
};

exports.updateAddress = async (id, userId, data) => {
  const { phone, addressLine, city, country, isDefault } = data;

  if (isDefault) {
    await prisma.address.updateMany({
      where: { userId: parseInt(userId) },
      data: { isDefault: false }
    });
  }

  return await prisma.address.update({
    where: { id: parseInt(id), userId: parseInt(userId) },
    data: { phone, addressLine, city, country, isDefault }
  });
};

exports.deleteAddress = async (id, userId) => {
  return await prisma.address.delete({
    where: { id: parseInt(id), userId: parseInt(userId) }
  });
};

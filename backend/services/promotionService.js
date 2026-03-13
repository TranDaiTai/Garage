const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllPromotions = async () => {
  return await prisma.promotion.findMany({
    orderBy: { startDate: 'desc' }
  });
};

exports.getPromotionByCode = async (code) => {
  return await prisma.promotion.findUnique({
    where: { code }
  });
};

exports.validateAndApplyPromotion = async (code) => {
  const promotion = await prisma.promotion.findUnique({
    where: { code }
  });

  if (!promotion) return { isValid: false, message: "Mã không hợp lệ." };

  const now = new Date();
  if (promotion.startDate && now < new Date(promotion.startDate)) {
    return { isValid: false, message: "Mã chưa đến thời gian áp dụng." };
  }
  
  if (promotion.endDate && now > new Date(promotion.endDate)) {
    return { isValid: false, message: "Mã đã hết hạn." };
  }

  if (promotion.maxUsage && promotion.usedCount >= promotion.maxUsage) {
    return { isValid: false, message: "Mã đã hết lượt sử dụng." };
  }

  return { isValid: true, data: promotion };
};

exports.createPromotion = async (data) => {
  return await prisma.promotion.create({ data });
};

exports.updatePromotion = async (id, data) => {
  return await prisma.promotion.update({
    where: { id: parseInt(id) },
    data
  });
};

exports.deletePromotion = async (id) => {
  return await prisma.promotion.delete({
    where: { id: parseInt(id) }
  });
};

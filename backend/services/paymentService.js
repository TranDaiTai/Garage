const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getPaymentByOrderId = async (orderId) => {
  return await prisma.payment.findUnique({
    where: { orderId: parseInt(orderId) },
  });
};

exports.updatePaymentStatus = async (orderId, status) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Cập nhật record thanh toán
    const payment = await tx.payment.update({
      where: { orderId: parseInt(orderId) },
      data: { 
        status,
        paymentDate: status === "completed" ? new Date() : null 
      }
    });

    // 2. Tự động cập nhật trạng thái đơn hàng nếu thanh toán xong
    if (status === "completed") {
      await tx.order.update({
        where: { id: parseInt(orderId) },
        data: { status: "processing" } // Đã thanh toán, chuyển sang xử lý đóng gói
      });
    }

    return payment;
  });
};

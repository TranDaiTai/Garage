const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createOrder = async (userId, data) => {
  const { items, addressId, promotionId, totalAmount, paymentMethod } = data;
  /*
    items: [{ productId, quantity, price, subtotal }]
  */
  
  return await prisma.$transaction(async (tx) => {
    // 1. Tạo Order
    const order = await tx.order.create({
      data: {
        userId: parseInt(userId),
        addressId: addressId ? parseInt(addressId) : null,
        promotionId: promotionId ? parseInt(promotionId) : null,
        totalAmount,
        status: "pending",
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
            subtotal: item.subtotal
          }))
        }
      },
      include: { items: true }
    });

    // 2. Tạo record Payment (nếu cần)
    if (paymentMethod) {
      await tx.payment.create({
        data: {
          orderId: order.id,
          amount: totalAmount,
          method: paymentMethod,
          status: "pending"
        }
      });
    }

    // 3. Clear giỏ hàng (nếu mua từ giỏ hàng)
    // Tùy chọn: có thể để frontend tự clear giỏ qua API cart sau khi đặt xong

    return order;
  });
};

exports.getOrdersByUserId = async (userId) => {
  return await prisma.order.findMany({
    where: { userId: parseInt(userId) },
    include: {
      items: {
        include: { product: { select: { name: true, images: { take: 1 } } } }
      },
      payment: true
    },
    orderBy: { orderDate: 'desc' }
  });
};

exports.getOrderById = async (orderId) => {
  return await prisma.order.findUnique({
    where: { id: parseInt(orderId) },
    include: {
      items: { include: { product: true } },
      address: true,
      payment: true,
      promotion: true
    }
  });
};

exports.updateOrderStatus = async (orderId, status) => {
  return await prisma.order.update({
    where: { id: parseInt(orderId) },
    data: { status }
  });
};

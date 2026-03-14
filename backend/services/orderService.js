const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createOrder = async (userId, data) => {
  const { items, addressId, promotionId, totalAmount, paymentMethod, shippingMethodId, shippingFee = 0 } = data;
  /*
    items: [{ productId, variantId, quantity, price, subtotal }]
  */
  
  return await prisma.$transaction(async (tx) => {
    // 1. Kiểm tra tồn kho trước khi đặt hàng
    for (const item of items) {
      if (item.variantId) {
        const variant = await tx.productVariant.findUnique({ where: { id: item.variantId } });
        if (!variant || variant.stock < item.quantity) {
          throw new Error(`Sản phẩm variant (ID ${item.variantId}) đã hết hàng hoặc không đủ số lượng.`);
        }
      }
      // Bạn có thể thêm tồn kho chung trên bảng `Product` nếu cần, hiện tại đang làm trên `ProductVariant`
    }

    // 2. Trừ tồn kho
    for (const item of items) {
       if (item.variantId) {
          await tx.productVariant.update({
             where: { id: item.variantId },
             data: { stock: { decrement: item.quantity } }
          });
       }
    }

     // 3. Tạo Order
     const order = await tx.order.create({
       data: {
         userId: parseInt(userId),
         addressId: addressId ? parseInt(addressId) : null,
         promotionId: promotionId ? parseInt(promotionId) : null,
         shippingMethodId: shippingMethodId ? parseInt(shippingMethodId) : null,
         shippingFee: parseFloat(shippingFee),
         totalAmount: parseFloat(totalAmount),
         status: "pending",
         items: {
           create: items.map(item => ({
             productId: item.productId,
             variantId: item.variantId || null,
             quantity: item.quantity,
             priceAtPurchase: item.price,
             subtotal: item.subtotal
           }))
         },
         statusHistory: {
           create: [{
              status: "pending",
              note: "Đơn hàng đã được tạo mới"
           }]
         }
       },
       include: { items: true, statusHistory: true }
     });

     // 3.1 Cập nhật số lượng đã bán (Social Proof)
     for (const item of items) {
       await tx.product.update({
         where: { id: item.productId },
         data: { soldCount: { increment: item.quantity || 1 } }
       });
     }

    // 4. Tạo record Payment (nếu có)
    if (paymentMethod) {
      await tx.payment.create({
        data: {
          orderId: order.id,
          amount: parseFloat(totalAmount),
          method: paymentMethod,
          status: "pending"
        }
      });
    }

    // Tùy chọn: Xóa giỏ hàng sẽ xử lý ở Controller

    return order;
  });
};

exports.getOrdersByUserId = async (userId) => {
  return await prisma.order.findMany({
    where: { userId: parseInt(userId) },
    include: {
      items: {
        include: { 
           product: { select: { name: true, images: { take: 1 } } },
           variant: { select: { color: true, size: true, sku: true } }
        }
      },
      payment: true,
      statusHistory: { orderBy: { createdAt: 'desc' } }
    },
    orderBy: { orderDate: 'desc' }
  });
};

exports.getOrderById = async (orderId) => {
  return await prisma.order.findUnique({
    where: { id: parseInt(orderId) },
    include: {
      items: { include: { product: true, variant: true } },
      address: true,
      payment: true,
      promotion: true,
      shippingMethod: true,
      statusHistory: { orderBy: { createdAt: 'desc' } }
    }
  });
};

exports.updateOrderStatus = async (orderId, newStatus, note = "", adminId = null) => {
  return await prisma.$transaction(async (tx) => {
     const order = await tx.order.findUnique({ where: { id: parseInt(orderId) }, include: { items: true } });
     if (!order) throw new Error("Order not found");

     // Cập nhật trạng thái Order
     const updatedOrder = await tx.order.update({
        where: { id: order.id },
        data: { status: newStatus }
     });

     // Ghi nhận lịch sử
     await tx.orderStatusHistory.create({
        data: {
           orderId: order.id,
           status: newStatus,
           note: note,
           createdBy: adminId ? parseInt(adminId) : null
        }
     });

     // Logic thưởng điểm nếu giao hàng thành công
     if (newStatus === "delivered" && order.userId) {
        // Ví dụ: 10,000 VND = 1 điểm
        const earnedPoints = Math.floor(Number(order.totalAmount) / 10000);
        await tx.user.update({
           where: { id: order.userId },
           data: { points: { increment: earnedPoints } }
        });
     }

     // Logic trả lại kho nếu đơn hàng bị hoàn/hủy
     if (newStatus === "cancelled") {
        for (const item of order.items) {
           if (item.variantId) {
              await tx.productVariant.update({
                 where: { id: item.variantId },
                 data: { stock: { increment: item.quantity } }
              });
           }
        }
     }

     return updatedOrder;
  });
};

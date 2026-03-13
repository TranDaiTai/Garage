const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : req.body.userId; // Cần authMiddleware
    if (!userId) return res.status(401).json({ success: false, message: "Chưa đăng nhập" });

    const data = req.body;
    if (!data.items || data.items.length === 0) {
      return res.status(400).json({ success: false, message: "Đơn hàng trống" });
    }

    const newOrder = await orderService.createOrder(userId, data);
    res.status(201).json({ success: true, message: "Đặt hàng thành công", data: newOrder });
  } catch (error) {
    console.error("Lỗi đặt hàng:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : req.query.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Chưa đăng nhập" });

    const orders = await orderService.getOrdersByUserId(userId);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Lỗi lấy danh sách đơn:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    
    // Authorization: Check xem đơn hàng có phải của user này hay không
    const requestUserId = req.user ? req.user.userId : req.query.userId;
    if (order.userId !== parseInt(requestUserId) && (!req.user || req.user.role !== 'admin')) {
        return res.status(403).json({ success: false, message: "Bạn không có quyền truy cập đơn hàng này" });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error("Lỗi chi tiết đơn:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

// Thường dành cho Admin cập nhật trạng thái
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: "Thiếu trạng thái" });

    const updatedOrder = await orderService.updateOrderStatus(req.params.id, status);
    res.json({ success: true, message: "Cập nhật thành công", data: updatedOrder });
  } catch (error) {
    console.error("Lỗi cập nhật đơn:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

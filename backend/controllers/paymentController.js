const paymentService = require("../services/paymentService");

exports.getPaymentByOrderId = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentByOrderId(req.params.orderId);
    if (!payment) return res.status(404).json({ success: false, message: "Không tìm thấy thông tin thanh toán" });
    
    res.json({ success: true, data: payment });
  } catch (error) {
    console.error("Lỗi lấy thanh toán:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: "Thiếu trạng thái" });

    // webhook callback từ (VNPay/MoMo) có thể goi vào API này hoặc admin
    const payment = await paymentService.updatePaymentStatus(req.params.orderId, status);
    
    res.json({ success: true, message: "Cập nhật thành công", data: payment });
  } catch (error) {
    console.error("Lỗi cập nhật thanh toán:", error);
    if (error.code === 'P2025') {
       return res.status(404).json({ success: false, message: "Không tìm thấy thanh toán" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

const shippingService = require("../services/shippingService");

exports.getShippingMethods = async (req, res) => {
  try {
    const methods = await shippingService.getShippingMethods();
    return res.status(200).json({ success: true, data: methods });
  } catch (err) {
    console.error("Error in getShippingMethods controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi lấy phương thức vận chuyển" });
  }
};

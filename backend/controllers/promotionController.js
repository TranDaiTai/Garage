const promotionService = require("../services/promotionService");

exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await promotionService.getAllPromotions();
    res.json({ success: true, data: promotions });
  } catch (error) {
    console.error("Lỗi lấy danh sách khuyến mãi:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.checkPromotionCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, message: "Vui lòng nhập mã" });

    const result = await promotionService.validateAndApplyPromotion(code);
    if (!result.isValid) {
      return res.status(400).json({ success: false, message: result.message });
    }

    res.json({ success: true, message: "Mã hợp lệ", data: result.data });
  } catch (error) {
    console.error("Lỗi kiểm tra mã khuyến mãi:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.createPromotion = async (req, res) => {
  try {
    const { code, name, discount_type, discount_value } = req.body;
    if (!name || !discount_type || discount_value === undefined) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin bắt buộc" });
    }

    const newPromotion = await promotionService.createPromotion(req.body);
    res.status(201).json({ success: true, message: "Tạo thành công", data: newPromotion });
  } catch (error) {
    console.error("Lỗi tạo mã:", error);
    if (error.code === 'P2002') {
       return res.status(400).json({ success: false, message: "Mã code đã tồn tại" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const updated = await promotionService.updatePromotion(req.params.id, req.body);
    res.json({ success: true, message: "Cập nhật thành công", data: updated });
  } catch (error) {
    console.error("Lỗi cập nhật mã:", error);
    if (error.code === 'P2025') {
       return res.status(404).json({ success: false, message: "Không tìm thấy chương trình" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    await promotionService.deletePromotion(req.params.id);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi xóa mã:", error);
    if (error.code === 'P2025') {
       return res.status(404).json({ success: false, message: "Không tìm thấy chương trình" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

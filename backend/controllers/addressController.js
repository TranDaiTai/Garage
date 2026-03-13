const addressService = require("../services/addressService");

// Cần middleware auth lấy user_id từ token, ở đây giả lập req.user.id
exports.getUserAddresses = async (req, res) => {
  try {
    // Giả sử có authMiddleware đưa `req.user` vào request
    const userId = req.user ? req.user.userId : req.query.userId; 
    if (!userId) {
      return res.status(401).json({ success: false, message: "Chưa đăng nhập" });
    }

    const addresses = await addressService.getAddressesByUserId(userId);
    res.json({ success: true, data: addresses });
  } catch (error) {
    console.error("Lỗi lấy sổ địa chỉ:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.createAddress = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : req.body.userId;
    if (!userId || !req.body.addressLine) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập địa chỉ hợp lệ" });
    }

    const newAddress = await addressService.createAddress(userId, req.body);
    res.status(201).json({ success: true, message: "Thêm địa chỉ thành công", data: newAddress });
  } catch (error) {
    console.error("Lỗi thêm địa chỉ:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : req.body.userId; // Dùng body tạm làm mock nếu thiếu auth middleware
    if (!userId) {
        return res.status(401).json({ success: false, message: "Chưa đăng nhập" });
    }
    
    const updatedAddress = await addressService.updateAddress(req.params.id, userId, req.body);
    res.json({ success: true, message: "Cập nhật thành công", data: updatedAddress });
  } catch (error) {
    console.error("Lỗi cập nhật địa chỉ:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: "Không tìm thấy địa chỉ hoặc bạn không có quyền" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : req.body.userId; // Mock token data
    if (!userId) {
        return res.status(401).json({ success: false, message: "Chưa đăng nhập" });
    }

    await addressService.deleteAddress(req.params.id, userId);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi xóa địa chỉ:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: "Không tìm thấy địa chỉ" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

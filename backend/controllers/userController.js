const userService = require("../services/userService");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Lỗi lấy danh sách user:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Lỗi lấy chi tiết user:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập đủ username, email và password" });
    }

    const newUser = await userService.createUser(req.body);
    res.status(201).json({ success: true, message: "Tạo thành công", data: newUser });
  } catch (error) {
    console.error("Lỗi tạo user:", error);
    if (error.code === 'P2002') { // Prisma unique constraint error
      return res.status(400).json({ success: false, message: "Username hoặc Email đã tồn tại" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json({ success: true, message: "Cập nhật thành công", data: updatedUser });
  } catch (error) {
    console.error("Lỗi cập nhật user:", error);
    if (error.code === 'P2025') { // Trang Prisma record not found error
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi xóa user:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

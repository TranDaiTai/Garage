const categoryService = require("../services/categoryService");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Lỗi lấy danh mục:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    console.error("Lỗi chi tiết danh mục:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Tên danh mục là bắt buộc" });
    }
    const newCategory = await categoryService.createCategory(req.body);
    res.status(201).json({ success: true, message: "Tạo thành công", data: newCategory });
  } catch (error) {
    console.error("Lỗi tạo danh mục:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    res.json({ success: true, message: "Cập nhật thành công", data: updatedCategory });
  } catch (error) {
    console.error("Lỗi cập nhật danh mục:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi xóa danh mục:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    }
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

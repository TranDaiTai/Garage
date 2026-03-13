// src/controllers/productController.js

const productService = require("../services/productService");

exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      minPrice,
      maxPrice,
      rating,
      hasDiscount,
      sort = "relevant",
    } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      search: search?.trim(),
      categories: category
        ? Array.isArray(category)
          ? category
          : [category]
        : [],
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      rating: rating ? parseFloat(rating) : null,
      hasDiscount: hasDiscount === "true",
      sort,
    };

    const result = await productService.getProducts(options);

    res.json({
      success: true,
      message: "lay san pham thanh cong",
      data: {
        product: result.products,
        pagination: result.pagination,
      },
    });
  } catch (err) {
    console.error("Error in getAllProducts:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "ID sản phẩm không hợp lệ" });
    }

    const product = await productService.getProductById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.json({ success: true, data: { product: product } });
  } catch (err) {
    console.error("Error in getProductById:", err);
    res.status(400).json({ success: false, message: "Lỗi server" });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res
        .status(400)
        .json({ success: false, message: "Slug sản phẩm không hợp lệ" });
    }

    const product = await productService.getProductBySlug(slug);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.json({ success: true, data: { product: product } });
  } catch (err) {
    console.error("Error in getProductBySlug:", err);
    res.status(400).json({ success: false, message: "Lỗi server" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      message: "Tạo sản phẩm thành công",
      data: newProduct
    });
  } catch (err) {
    console.error("Error in createProduct:", err);
    res.status(400).json({ success: false, message: err.message || "Lỗi tạo sản phẩm" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.updateProduct(id, req.body);
    res.json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: updatedProduct
    });
  } catch (err) {
    console.error("Error in updateProduct:", err);
    res.status(400).json({ success: false, message: err.message || "Lỗi cập nhật sản phẩm" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.json({
      success: true,
      message: "Xóa sản phẩm thành công"
    });
  } catch (err) {
    console.error("Error in deleteProduct:", err);
    res.status(400).json({ success: false, message: err.message || "Lỗi xóa sản phẩm" });
  }
};

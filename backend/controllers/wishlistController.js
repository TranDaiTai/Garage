const wishlistService = require("../services/wishlistService");

exports.getWishlist = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Không có quyền truy cập" });

    const result = await wishlistService.getWishlist(user.userId);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Error in getWishlist controller:", err);
    return res.status(500).json({ success: false, message: "Có lỗi xảy ra khi lấy danh sách yêu thích" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Không có quyền truy cập" });

    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "Thiếu productId" });

    const result = await wishlistService.addToWishlist(user.userId, Number(productId));
    return res.json({ success: true, message: "Đã thêm vào danh sách yêu thích", data: result });
  } catch (err) {
    console.error("Error in addToWishlist controller:", err);
    if(err.message === 'Product already in wishlist') {
         return res.status(400).json({ success: false, message: "Sản phẩm đã tồn tại trong danh sách yêu thích" });
    }
    return res.status(500).json({ success: false, message: "Lỗi thêm vào yêu thích" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Không có quyền truy cập" });

    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "Thiếu productId" });

    await wishlistService.removeFromWishlist(user.userId, Number(productId));
    return res.json({ success: true, message: "Đã xóa khỏi danh sách yêu thích" });
  } catch (err) {
    console.error("Error in removeFromWishlist controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi xóa khối yêu thích" });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Không có quyền truy cập" });

    await wishlistService.clearWishlist(user.userId);
    return res.status(200).json({ success: true, message: "Xóa toàn bộ danh sách yêu thích thành công" });
  } catch (err) {
    console.error("Error in clearWishlist controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi" });
  }
};

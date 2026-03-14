/**
 * Mappers dùng để biến đổi dữ liệu từ Database (Prisma) thành dữ liệu trả về cho Frontend (DTO).
 * Giúp bảo mật thông tin nhạy cảm và chuẩn hóa định dạng dữ liệu.
 */

const mappers = {
  /**
   * Biến đổi dữ liệu User
   * Loại bỏ các trường nhạy cảm như passwordHash, refreshToken...
   */
  toUserDTO: (user) => {
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName || user.full_name || user.username,
      avatar: user.avatarUrl || user.avatar || null,
      role: user.role?.name || user.role || 'user',
      points: user.points || 0,
      phone: user.phone || null,
      createdAt: user.createdAt
    };
  },

  /**
   * Biến đổi dữ liệu Sản phẩm
   * Tính toán giảm giá, chuẩn hóa đường dẫn ảnh, gộp thông tin đánh giá.
   */
  toProductDTO: (product) => {
    if (!product) return null;

    const price = Number(product.price);
    const originalPrice = Number(product.originalPrice || product.price);
    const hasDiscount = originalPrice > price;
    const discountPercent = hasDiscount 
      ? Math.round((1 - price / originalPrice) * 100) 
      : 0;

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: price,
      originalPrice: originalPrice,
      hasDiscount: hasDiscount,
      discountPercent: discountPercent,
      image: product.image || (product.images?.[0]?.imageUrl),
      images: product.images || [],
      stock: product.stock,
      soldCount: product.soldCount || 0,
      rating: Number(product.rating || 0).toFixed(1),
      reviewsCount: product.reviewsCount || product._count?.reviews || 0,
      category: product.category?.name || null,
      categoryId: product.categoryId,
      brand: product.brand,
      variants: product.variants || []
    };
  }
};

module.exports = mappers;

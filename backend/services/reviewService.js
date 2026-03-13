// services/review.service.js
const prisma = require("../src/lib/prisma");

exports.getReviewsByProductId = async (
  productId,
  { page = 1, limit = 8, rating = null, hasMedia = false, sort = null }
) => {
  if (!productId) throw new Error("productId is required");

  const skip = (Number(page) - 1) * Number(limit);

  /* =======================
     WHERE (lọc dữ liệu)
     ======================= */
  const where = {
    productId: Number(productId),
  };

  // Lọc theo rating
  if (rating) {
    where.rating = Number(rating);
  }

  // Lọc review có hình ảnh
  if (hasMedia === "true" || hasMedia === true) {
    where.images = {
      some: {}, // tồn tại ít nhất 1 image
    };
  }

  /* =======================
     SORT
     ======================= */
  let orderBy = { reviewDate: "desc" }; // mặc định: mới nhất

  if (sort === "rating-asc") orderBy = { rating: "asc" };
  if (sort === "rating-desc") orderBy = { rating: "desc" };
  if (sort === "likes-desc") orderBy = { likes: "desc" };

  /* =======================
     QUERY REVIEWS
     ======================= */
  const [reviews, totalFiltered] = await Promise.all([
    prisma.review.findMany({
      where,
      orderBy,
      skip,
      take: Number(limit),
      include: {
        images: {
          select: {
            id: true,
            imageUrl: true,
          },
        },
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    }),
    prisma.review.count({ where }),
  ]);

  /* =======================
     STATS (TÍNH TRÊN ALL REVIEW)
     ======================= */

  // Tổng review
  const totalAll = await prisma.review.count({
    where: { productId: Number(productId) },
  });

  // Đếm theo rating
  const ratingGroup = await prisma.review.groupBy({
    by: ["rating"],
    where: { productId: Number(productId) },
    _count: { rating: true },
  });

  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratingGroup.forEach((r) => {
    ratingCounts[r.rating] = r._count.rating;
  });

  // Đếm review có hình ảnh
  const mediaCount = await prisma.review.count({
    where: {
      productId: Number(productId),
      images: {
        some: {},
      },
    },
  });

  // Rating trung bình
  const avgResult = await prisma.review.aggregate({
    where: { productId: Number(productId) },
    _avg: { rating: true },
  });

  const averageRating = avgResult._avg.rating || 0;

  /* =======================
     RETURN
     ======================= */
  return {
    stats: {
      total: totalAll,
      ratingCounts,
      mediaCount,
      averageRating: Number(averageRating.toFixed(1)),
    },
    data: reviews,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalItems: totalFiltered,
      totalPages: Math.ceil(totalFiltered / limit),
    },
  };
};

exports.createReview = async (userId, { productId, rating, title, content, images = [] }) => {
  if (!productId || !rating) throw new Error("Missing required fields: productId and rating");

  // Kiểm tra sản phẩm có tồn tại không
  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
  });
  if (!product) throw new Error("Product not found");

  // Tạo transaction để: 
  // 1. Tạo Review
  // 2. Cập nhật reviewsCount và rating trung bình trong Product
  return await prisma.$transaction(async (tx) => {
    // 1. Tạo Review record
    const newReview = await tx.review.create({
      data: {
        productId: Number(productId),
        userId: userId ? Number(userId) : null,
        rating: Number(rating),
        title,
        content,
        authorDisplay: userId ? undefined : "Guest",
        images: {
          create: images.map(img => ({ imageUrl: img }))
        }
      },
      include: {
        images: true
      }
    });

    // 2. Lấy lại stats mới để cập nhật cho Product
    const avgData = await tx.review.aggregate({
      where: { productId: Number(productId) },
      _avg: { rating: true },
      _count: { id: true }
    });

    await tx.product.update({
      where: { id: Number(productId) },
      data: {
        rating: avgData._avg.rating || 0,
        reviewsCount: avgData._count.id || 0
      }
    });

    return newReview;
  });
};

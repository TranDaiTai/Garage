const prisma = require("../src/lib/prisma");

/**
 * Lấy danh sách sản phẩm với bộ lọc, phân trang và sắp xếp
 */
exports.getProducts = async ({
  page = 1,
  limit = 20,
  search = '',
  categories = [], // mảng string hoặc number
  minPrice = null,
  maxPrice = null,
  rating = null,
  hasDiscount = false, // true/false
  sort = 'newest', // newest | best-selling | price-low | price-high
}) => {
  const skip = (page - 1) * limit;

  // Xây dựng điều kiện WHERE
  const whereConditions = [];

  // Tìm kiếm theo tên (không phân biệt hoa thường)
  if (search.trim()) {
    whereConditions.push({
      name: { contains: search.trim(), mode: 'insensitive' },
    });
  }

  // Lọc theo danh mục
  if (categories.length > 0) {
    const categoryIds = categories.map((cat) => parseInt(cat)).filter((id) => !isNaN(id));
    if (categoryIds.length > 0) {
      whereConditions.push({
        categoryId: { in: categoryIds },
      });
    }
  }

  // Lọc theo khoảng giá
  if (minPrice !== null || maxPrice !== null) {
    const priceFilter = {};
    if (minPrice !== null) priceFilter.gte = Number(minPrice);
    if (maxPrice !== null) priceFilter.lte = Number(maxPrice);
    whereConditions.push({ price: priceFilter });
  }

  // Lọc theo đánh giá tối thiểu
  if (rating !== null) {
    whereConditions.push({
      rating: { gte: Number(rating) },
    });
  }

  // Lọc sản phẩm đang giảm giá: originalPrice phải tồn tại và lớn hơn price hiện tại
  if (hasDiscount) {
    whereConditions.push({
      originalPrice: { not: null },
      // Prisma không hỗ trợ so sánh field với field trực tiếp trong where
      // Nên chỉ lọc originalPrice tồn tại, việc originalPrice > price sẽ kiểm tra sau khi lấy dữ liệu
    });
  }

  // Xác định sắp xếp
  let orderBy = { createdAt: 'desc' }; // mặc định: mới nhất

  switch (sort) {
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'best-selling':
      // hoặc nếu soldCount là field số:
       orderBy = { soldCount: 'desc' };
      break;
    case 'price-low':
      orderBy = { price: 'asc' };
      break;
    case 'price-high':
      orderBy = { price: 'desc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  // Query chính
  const [productsRaw, total] = await Promise.all([
    prisma.product.findMany({
      where: whereConditions.length > 0 ? { AND: whereConditions } : {},
      orderBy,
      skip,
      take: limit,
      include: {
        images: {
          orderBy: { position: 'asc' },
        },
        variants: true,
      },
    }),
    prisma.product.count({
      where: whereConditions.length > 0 ? { AND: whereConditions } : {},
    }),
  ]);

  // Nếu có lọc hasDiscount, lọc thêm ở mức ứng dụng để đảm bảo originalPrice > price
  let products = productsRaw;
  let finalTotal = total;

  if (hasDiscount) {
    products = productsRaw.filter((p) => p.originalPrice !== null && p.originalPrice > p.price);
    finalTotal = products.length; // Nếu muốn chính xác 100% thì dùng raw query riêng, nhưng với phân trang thì cách này ổn
    // Hoặc tính lại total bằng query riêng nếu cần chính xác (xem ghi chú bên dưới)
  }

  return {
    products,
    pagination: {
      currentPage: Number(page),
      pageSize: Number(limit),
      totalItems: finalTotal,
      totalPages: Math.ceil(finalTotal / limit),
      hasNext: page * limit < finalTotal,
      hasPrev: page > 1,
    },
  };
};

/**
 * Lấy chi tiết một sản phẩm theo ID
 */
exports.getProductById = async (id) => {
  const productId = parseInt(id);
  if (isNaN(productId)) throw new Error('productId must be fill');

  return await prisma.product.findUnique({
    where: { id: productId },
    include: {
      variants: true,
      images: {
        orderBy: { position: 'asc' },
      },
      category: true,
      reviews: {
        include: {
          images: true,
          // user: {
          //   select: { fullName: true }, // nếu có avatar
          // },
        },
        orderBy: { reviewDate: 'desc' },
      },
    },
  });
};

/**
 * Lấy chi tiết một sản phẩm theo Slug
 */
exports.getProductBySlug = async (slug) => {
  if (!slug) throw new Error('slug must be filled');

  return await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      images: {
        orderBy: { position: 'asc' },
      },
      category: true,
      reviews: {
        include: {
          images: true,
        },
        orderBy: { reviewDate: 'desc' },
      },
    },
  });
};

/**
 * Tạo sản phẩm mới kèm Variants và Images
 */
exports.createProduct = async (data) => {
  const { 
    name, 
    price, 
    originalPrice, 
    description, 
    fullDescription, 
    categoryId, 
    variants = [], 
    images = [] 
  } = data;

  return await prisma.product.create({
    data: {
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      description,
      fullDescription,
      categoryId: categoryId ? Number(categoryId) : null,
      variants: {
        create: variants.map(v => ({
          sku: v.sku,
          name: v.name,
          price: Number(v.price),
          stock: Number(v.stock),
          attributeName: v.attributeName,
          attributeValue: v.attributeValue
        }))
      },
      images: {
        create: images.map((url, index) => ({
          imageUrl: url,
          position: index,
          isMain: index === 0
        }))
      }
    },
    include: {
      variants: true,
      images: true,
      category: true
    }
  });
};

/**
 * Cập nhật sản phẩm kèm logic sync Variants và Images
 */
exports.updateProduct = async (id, data) => {
  const productId = Number(id);
  const { 
    name, 
    price, 
    originalPrice, 
    description, 
    fullDescription, 
    categoryId, 
    variants, 
    images 
  } = data;

  return await prisma.$transaction(async (tx) => {
    // 1. Cập nhật thông tin cơ bản
    const updatedProduct = await tx.product.update({
      where: { id: productId },
      data: {
        name,
        price: price ? Number(price) : undefined,
        originalPrice: originalPrice !== undefined ? Number(originalPrice) : undefined,
        description,
        fullDescription,
        categoryId: categoryId ? Number(categoryId) : undefined,
      }
    });

    // 2. Cập nhật Variants nếu có gửi lên (Logic Sync: Xóa cũ tạo mới cho đơn giản hoặc Update theo ID)
    if (variants) {
      // Ở mức độ trung bình, ta xóa hết variants cũ và tạo lại để đảm bảo đồng bộ
      // Nếu muốn tối ưu hơn có thể so sánh ID
      await tx.productVariant.deleteMany({ where: { productId } });
      await tx.productVariant.createMany({
        data: variants.map(v => ({
          productId,
          sku: v.sku,
          name: v.name,
          price: Number(v.price),
          stock: Number(v.stock),
          attributeName: v.attributeName,
          attributeValue: v.attributeValue
        }))
      });
    }

    // 3. Cập nhật Images nếu có gửi lên
    if (images) {
      await tx.productImage.deleteMany({ where: { productId } });
      await tx.productImage.createMany({
        data: images.map((url, index) => ({
          productId,
          imageUrl: url,
          position: index,
          isMain: index === 0
        }))
      });
    }

    return await tx.product.findUnique({
      where: { id: productId },
      include: { variants: true, images: true }
    });
  });
};

/**
 * Xóa sản phẩm và các ràng buộc
 */
exports.deleteProduct = async (id) => {
  const productId = Number(id);
  
  // Do cấu hình Prisma schema, ta cần xóa variants và images trước nếu không có cascade delete
  return await prisma.$transaction(async (tx) => {
    await tx.productVariant.deleteMany({ where: { productId } });
    await tx.productImage.deleteMany({ where: { productId } });
    await tx.review.deleteMany({ where: { productId } });
    await tx.cartItem.deleteMany({ where: { productId } });
    
    return await tx.product.delete({
      where: { id: productId }
    });
  });
};
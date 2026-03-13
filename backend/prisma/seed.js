const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Hàm tạo slug đơn giản
function createSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Xóa các ký tự đặc biệt
    .replace(/[\s_-]+/g, '-') // Thay khoảng trắng bằng gạch ngang
    .replace(/^-+|-+$/g, ''); // Xóa gạch ngang ở đầu và cuối
}

async function main() {
  console.log('--- Đang dọn dẹp dữ liệu cũ... ---');
  // Xóa theo thứ tự để tránh lỗi khóa ngoại
  await prisma.orderStatusHistory.deleteMany({});
  await prisma.wishlistItem.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.shippingMethod.deleteMany({});
  await prisma.role.deleteMany({});

  console.log('--- Đang tạo Roles... ---');
  const adminRole = await prisma.role.create({
    data: { name: 'ADMIN', description: 'Quản trị viên toàn hệ thống' }
  });
  const staffRole = await prisma.role.create({
    data: { name: 'STAFF', description: 'Nhân viên quản lý đơn hàng' }
  });
  const userRole = await prisma.role.create({
    data: { name: 'USER', description: 'Khách hàng mua sắm' }
  });

  console.log('--- Đang tạo Categories... ---');
  const categories = await Promise.all([
    prisma.category.create({
      data: { 
        name: 'Electronics', 
        description: 'Điện thoại, Laptop, Tai nghe và các thiết bị số',
        imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80'
      }
    }),
    prisma.category.create({
      data: { 
        name: 'Fashion', 
        description: 'Quần áo, giày dép thời thượng',
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80'
      }
    }),
    prisma.category.create({
      data: { 
        name: 'Home & Kitchen', 
        description: 'Đồ gia dụng và trang trí nội thất',
        imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80'
      }
    }),
    prisma.category.create({
      data: { 
        name: 'Accessories', 
        description: 'Đồng hồ, túi xách và phụ kiện đi kèm',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
      }
    })
  ]);

  console.log('--- Đang tạo Shipping Methods... ---');
  await Promise.all([
    prisma.shippingMethod.create({
      data: { name: 'Giao hàng Hoả tốc', description: 'Giao nhận trong 2H nội thành', baseFee: 45000, estimatedDays: 'Ngay trong ngày' }
    }),
    prisma.shippingMethod.create({
      data: { name: 'Giao hàng Tiêu chuẩn', description: 'Dịch vụ giao hàng thông thường toàn quốc', baseFee: 25000, estimatedDays: '3-5 Ngày' }
    })
  ]);

  console.log('--- Đang tạo Products... ---');
  const productsData = [
    {
      name: 'iPhone 15 Pro Max',
      categoryId: categories[0].id,
      price: 34990000,
      originalPrice: 36990000,
      description: 'Siêu phẩm đỉnh nhất của Apple năm 2024 với khung viền Titan cực bền.',
      fullDescription: 'iPhone 15 Pro Max mang đến hiệu năng mạnh mẽ với chip A17 Pro, màn hình Super Retina XDR đỉnh cao và hệ thống camera chuyên nghiệp với khả năng zoom quang học lên đến 5x.',
      images: [
        'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80',
        'https://images.unsplash.com/photo-1695653422715-991ec3a0db7a?w=800&q=80'
      ]
    },
    {
      name: 'MacBook Air M2',
      categoryId: categories[0].id,
      price: 24500000,
      originalPrice: 28000000,
      description: 'Mỏng nhẹ, mạnh mẽ với chip M2, phù hợp cho dân văn phòng và sinh viên.',
      fullDescription: 'MacBook Air M2 sở hữu thiết kế hoàn toàn mới, màn hình Liquid Retina tuyệt đẹp, thời lượng pin lên đến 18 tiếng giúp bạn làm việc cả ngày dài không cần sạc.',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ec696e5237?w=800&q=80'
      ]
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      categoryId: categories[0].id,
      price: 31990000,
      originalPrice: 33990000,
      description: 'Đỉnh cao công nghệ AI rực rỡ từ Samsung.',
      fullDescription: 'Galaxy AI is here. Trải nghiệm quyền năng công nghệ mới nhất trên chiếc smartphone đỉnh cao của Samsung. Camera 200MP, pin trâu và bút S Pen thần thánh.',
      images: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', // Hình S21 giả làm S24 cho đẹp
        'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&q=80'
      ]
    },
    {
      name: 'Áo Hoodie Premium',
      categoryId: categories[1].id,
      price: 450000,
      originalPrice: 600000,
      description: 'Chất liệu nỉ bông dày dặn, ấm áp cho mùa đông.',
      fullDescription: 'Áo hoodie được thiết kế theo phong cách Oversize hiện đại, chất vải không xù, đường may tỉ mỉ, phù hợp cho cả nam và nữ.',
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
        'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80'
      ]
    },
    {
      name: 'Áo Khoác Bomber Outerwear',
      categoryId: categories[1].id,
      price: 850000,
      originalPrice: 1050000,
      description: 'Áo khoác phong cách street style cực chất.',
      fullDescription: 'Bomber jacket với chất liệu kaki cao cấp, chống nước nhẹ, form chuẩn lên dáng cực đẹp. Thích hợp dạo phố, đi chơi.',
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
        'https://images.unsplash.com/photo-1548883354-94cb0b4ce882?w=800&q=80'
      ]
    },
    {
      name: 'Giày Sneaker White Classic',
      categoryId: categories[1].id,
      price: 1200000,
      originalPrice: 1500000,
      description: 'Đôi giày không bao giờ lỗi mốt cho mọi outfit.',
      fullDescription: 'Được làm từ da tổng hợp cao cấp, đế cao su chống trượt bền bỉ, Sneaker White Classic mang lại cảm giác êm ái khi di chuyển suốt ngày dài.',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
        'https://images.unsplash.com/photo-1525966222134-fcfa99bafb73?w=800&q=80'
      ]
    },
    {
      name: 'Máy pha Cà phê Espresso',
      categoryId: categories[2].id,
      price: 3200000,
      originalPrice: 4500000,
      description: 'Thưởng thức cà phê chuẩn vị tiệm ngay tại nhà.',
      fullDescription: 'Máy pha cà phê với áp suất 15 bar, tích hợp vòi đánh sữa giúp bạn dễ dàng tạo ra những tách Cappuccino hay Latte thơm ngon.',
      images: [
        'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
        'https://images.unsplash.com/photo-1570968015849-fb1117559bd4?w=800&q=80'
      ]
    },
    {
      name: 'Đồng Hồ Nam Dây Da Đen',
      categoryId: categories[3].id,
      price: 1800000,
      originalPrice: 2200000,
      description: 'Thanh lịch, sang trọng phù hợp doanh nhân.',
      fullDescription: 'Đồng hồ Quartz với mặt kính Sapphire chống xước, dây da thật cao cấp, thiết kế mỏng nhẹ tinh tế.',
      images: [
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
        'https://images.unsplash.com/photo-1508656961555-e7a935bebb7f?w=800&q=80'
      ]
    }
  ];

  for (const p of productsData) {
    const productSlug = createSlug(p.name);
    
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: productSlug,
        categoryId: p.categoryId,
        price: p.price,
        originalPrice: p.originalPrice,
        description: p.description,
        fullDescription: p.fullDescription,
        rating: 4.5,
        reviewsCount: 10,
        soldCount: 50
      }
    });

    for (let i = 0; i < p.images.length; i++) {
        await prisma.productImage.create({
            data: {
                productId: product.id,
                imageUrl: p.images[i],
                isMain: i === 0,
                position: i
            }
        });
    }

    // Tạo Variants mẫu cho từng sản phẩm
    if (p.categoryId === categories[0].id) {
       // Đồ điện tử (Màu sắc / Dung lượng)
       await prisma.productVariant.create({
          data: { productId: product.id, sku: `${product.id}-BLK-256`, color: 'Đen', size: '256GB', stock: 15, price: p.price }
       });
       await prisma.productVariant.create({
          data: { productId: product.id, sku: `${product.id}-WHT-512`, color: 'Trắng', size: '512GB', stock: 5, price: p.price + 3000000 }
       });
    } else if (p.categoryId === categories[1].id) {
       // Thời trang (Size)
       await prisma.productVariant.create({
          data: { productId: product.id, sku: `${product.id}-M`, color: 'Đen', size: 'M', stock: 50, price: p.price }
       });
       await prisma.productVariant.create({
          data: { productId: product.id, sku: `${product.id}-L`, color: 'Trắng', size: 'L', stock: 30, price: p.price }
       });
    } else {
       // Mặc định 1 variant cơ bản để test kho
       await prisma.productVariant.create({
          data: { productId: product.id, sku: `${product.id}-STD`, color: 'Mặc định', size: 'Tiêu chuẩn', stock: 100, price: p.price }
       });
    }
  }

  console.log('--- Đã hoàn thành Seed dữ liệu! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

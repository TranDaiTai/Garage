const prisma = require("../src/lib/prisma");

exports.getWishlist = async (userId) => {
  if (!userId) throw new Error("Unauthorized");

  const wishlist = await prisma.wishlist.findFirst({
    where: { userId },
  });

  if (!wishlist) {
    return { items: [], totalItems: 0 };
  }

  const [items, totalItems] = await Promise.all([
    prisma.wishlistItem.findMany({
      where: { wishlistId: wishlist.id },
      orderBy: { addedAt: "desc" },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            originalPrice: true,
            images: {
              where: { isMain: true },
              take: 1,
              select: { imageUrl: true },
            },
          },
        },
      },
    }),
    prisma.wishlistItem.count({ where: { wishlistId: wishlist.id } }),
  ]);

  const mappedItems = items.map((item) => ({
    id: item.id,
    addedAt: item.addedAt,
    product: {
      ...item.product,
      mainImage: item.product.images[0]?.imageUrl || null,
      images: undefined,
    },
  }));

  return {
    items: mappedItems,
    totalItems,
  };
};

exports.addToWishlist = async (userId, productId) => {
  if (!userId || !productId) throw new Error("Invalid input");

  // Đảm bảo user có wishlist
  let wishlist = await prisma.wishlist.findFirst({
    where: { userId },
  });

  if (!wishlist) {
      wishlist = await prisma.wishlist.create({
          data: { userId }
      });
  }

  const existing = await prisma.wishlistItem.findFirst({
    where: {
      wishlistId: wishlist.id,
      productId: productId,
    },
  });

  if (existing) {
    throw new Error('Product already in wishlist');
  }

  return prisma.wishlistItem.create({
    data: {
      wishlistId: wishlist.id,
      productId,
    },
  });
};

exports.removeFromWishlist = async (userId, productId) => {
  if (!userId) throw new Error("Unauthorized");

  const wishlist = await prisma.wishlist.findFirst({
    where: { userId },
  });

  if (!wishlist) throw new Error("wishlist not found");

  const item = await prisma.wishlistItem.findFirst({
    where: { wishlistId: wishlist.id, productId: productId },
  });

  if (!item) throw new Error("wishlistItem not found");

  await prisma.wishlistItem.delete({
    where: { id: item.id },
  });
};

exports.clearWishlist = async (userId) => {
  if (!userId) throw new Error("Unauthorized");

  const wishlist = await prisma.wishlist.findFirst({
    where: { userId },
  });

  if (!wishlist) return;

  await prisma.wishlistItem.deleteMany({ where: { wishlistId: wishlist.id } });
};

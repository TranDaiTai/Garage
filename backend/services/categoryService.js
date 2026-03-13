const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
};

exports.getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id: parseInt(id) },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          images: {
            where: { isMain: true },
            take: 1
          }
        }
      }
    }
  });
};

exports.createCategory = async (data) => {
  const { name, description, imageUrl } = data;
  return await prisma.category.create({
    data: { name, description, imageUrl }
  });
};

exports.updateCategory = async (id, data) => {
  const { name, description, imageUrl } = data;
  return await prisma.category.update({
    where: { id: parseInt(id) },
    data: { name, description, imageUrl }
  });
};

exports.deleteCategory = async (id) => {
  // Chú ý: Cấu hình onDelete ở schema là SetNull
  return await prisma.category.delete({
    where: { id: parseInt(id) },
  });
};

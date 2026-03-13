const prisma = require("../src/lib/prisma");

exports.getShippingMethods = async () => {
  return await prisma.shippingMethod.findMany();
};

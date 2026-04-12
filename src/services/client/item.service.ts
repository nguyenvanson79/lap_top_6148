import { prisma } from "config/client"

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}


const getProductById = async (id: number) => {
  return await prisma.product.findFirst({
    where: { id },
  });
}

export {
    getProducts,
    getProductById
}
import { prisma } from "config/client"

const getProducts = async (page : number , pageSize : number) => {
  const skip = (page -1) * pageSize
    const products = await prisma.product.findMany({
      skip : skip ,
      take : pageSize
    });
    return products;
}


const getProductById = async (id: number) => {
  return await prisma.product.findFirst({
    where: { id },
  });
}

const countTotalProductClientPages = async(pageSize: number) => {
  const totalItems= await prisma.product.count();

  const totalPages = Math.ceil(totalItems/pageSize);

  return totalPages ;
}

export {
    getProducts,
    getProductById ,
    countTotalProductClientPages
}
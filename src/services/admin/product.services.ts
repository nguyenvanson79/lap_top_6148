import { prisma } from "config/client"


//  tạo sản phẩm mới
const createProduct = async (
    name: string,
    price: number,
    detailDesc: string, 
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string | null
) => {
    await prisma.product.create({
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
           ...(imageUpload && { image: imageUpload }),
        },
    });
}

// lấy danh sách sản phẩm
const getProductList = async () => {
    return await prisma.product.findMany();
}

// xóa sản phẩm
const handleDeleteProduct = async (id: number) => {
    await prisma.product.delete({
        where: { id },
    });
}

// lấy sản phẩm theo id
const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id },
    });
}

// cập nhật sản phẩm theo id
 const updateProductByID = async (
    id: number,
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string | null
) => {
    await prisma.product.update({
        where: { id },
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            ...(imageUpload && { image: imageUpload }),
        },
    });
}


export { createProduct, getProductList, handleDeleteProduct, getProductById, updateProductByID }
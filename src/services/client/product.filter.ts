import { prisma } from "config/client";

// ================= USER FILTER =================
const userFilter = async (usernameInput: string) => {
    return await prisma.user.findMany({
        where: {
            username: {
                contains: usernameInput
            }
        }
    });
};


// ================= YÊU CẦU 1 =================
// lấy sp có giá trị tối thiểu bằng 1.000.000 
const yeuCau1 = async (minPrice: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                gte: minPrice
            }
        }
    });
};


// ================= YÊU CẦU 2 =================
// yêu cầu 2 tối đa 15.000.000
const yeuCau2 = async (maxPrice: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                lte: maxPrice
            }
        }
    });
};


// ================= YÊU CẦU 3 =================
// tìm sp có tên là apple 
const yeuCau3 = async (factory: string) => {
    return await prisma.product.findMany({
        where: {
            factory: {
                equals: factory
            }
        }
    });
};


// ================= YÊU CẦU 4 =================
const yeuCau4 = async (factoryArray: string[]) => {
    return await prisma.product.findMany({
        where: {
            factory: {
                in: factoryArray
            }
        }
    });
};


// ================= YÊU CẦU 5 =================
const yeuCau5 = async (min: number, max: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                gte: min,
                lte: max
            }
        }
    });
};


// ================= YÊU CẦU 6 =================
// nhiều khoảng giá khác nhau
const yeuCau6 = async () => {
    return await prisma.product.findMany({
        where: {
            OR: [
                { price: { gte: 10000000, lte: 15000000 } },
                { price: { gte: 16000000, lte: 20000000 } }
            ]
        }
    });
};


// ================= YÊU CẦU 7 =================
// sắp xếp giảm dần theo giá
const yeuCau7 = async () => {
    return await prisma.product.findMany({
        orderBy: {
            price: "asc"
        }
    });
};


export {
    userFilter,
    yeuCau1,
    yeuCau2,
    yeuCau3,
    yeuCau4,
    yeuCau5,
    yeuCau6,
    yeuCau7
};